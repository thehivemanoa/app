import { Meteor } from 'meteor/meteor';
import { Sessions } from '../../api/sessions /sessions.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.session}`);
  Sessions.insert(data);
}

/** Initialize the collection if empty. */
if (Sessions.find().count() === 0) {
  if (Meteor.settings.defaultSessions) {
    console.log('Creating default session list.');
    Meteor.settings.defaultSessions.map(data => addData(data));
  }
}

/** This subscription publishes all documents provided that the user is logged in */
Meteor.publish('Sessions', function publish() {
  if (this.userId) {
    return Sessions.find();
  }
  return this.ready();
});
