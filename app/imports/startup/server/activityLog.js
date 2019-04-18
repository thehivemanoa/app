import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { ActivityLog } from '../../api/activityLog/activityLog.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding activity for: ${data.owner}`);
  ActivityLog.insert(data);
}

/** Initialize the collection if empty. */
if (ActivityLog.find().count() === 0) {
  if (Meteor.settings.defaultActivityLog) {
    console.log('Creating default notification.');
    Meteor.settings.defaultActivityLog.map(data => addData(data));
  }
}

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('ActivityLog', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return ActivityLog.find();
  }
  return this.ready();
});
