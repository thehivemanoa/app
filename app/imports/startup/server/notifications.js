import { Meteor } from 'meteor/meteor';
import { Notifications } from '../../api/notifications/notifications.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding notification for: ${data.owner}`);
  Notifications.insert(data);
}

/** Initialize the collection if empty. */
if (Notifications.find().count() === 0) {
  if (Meteor.settings.defaultCourses) {
    console.log('Creating default course list.');
    Meteor.settings.defaultCourses.map(data => addData(data));
  }
}

/** This subscription publishes all documents provided that the user is logged in */
Meteor.publish('Notifications', function publish() {
  if (this.userId) {
    return Notifications.find();
  }
  return this.ready();
});
