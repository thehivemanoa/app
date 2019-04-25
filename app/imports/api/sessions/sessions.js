import { Meteor } from 'meteor/meteor';
import { Sessions } from '../../api/contact/contact.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  Sessions.insert(data);
}

/** Initialize the collection if empty. */
if (Sessions.find().count() === 0) {
  if (Meteor.settings.defaultSessions) {
    console.log('Creating default contacts.');
    Meteor.settings.defaultSessions.map(data => addData(data));
  }
}

/** This subscription publishes all documents provided that the user is logged in */
Meteor.publish('mySessions', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Sessions.find({ owner: username });
  }
  return this.ready();
});
