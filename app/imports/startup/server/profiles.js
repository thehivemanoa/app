import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/profiles.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.profile}`);
  Profiles.insert(data);
}

/** Initialize the collection if empty. */
if (Profiles.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default course list.');
    Meteor.settings.defaultProfiles.map(data => addData(data));
  }
}

/** This subscription publishes all documents provided that the user is logged in */
Meteor.publish('Profiles', function publish() {
  if (this.userId) {
    return Profiles.find();
  }
  return this.ready();
});
