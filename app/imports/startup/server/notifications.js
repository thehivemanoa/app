import { Meteor } from 'meteor/meteor';
import { Notifications } from '../../api/notifications/notifications.js';

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('Notifications', function publish() {
  if (this.userId) {
    return Notifications.find();
  }
  return this.ready();
});
