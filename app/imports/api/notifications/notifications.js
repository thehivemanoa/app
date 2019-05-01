import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Notifications = new Mongo.Collection('Notifications');

/** Create a schema to constrain the structure of documents associated with this collection. */
const NotificationSchema = new SimpleSchema({
  createdBy: String,
  content: String,
  createdAt: Date,
  isNew: Boolean,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Notifications.attachSchema(NotificationSchema);

/** Make the collection and schema available to other code. */
export { Notifications, NotificationSchema };
