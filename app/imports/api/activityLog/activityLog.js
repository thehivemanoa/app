import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const ActivityLog = new Mongo.Collection('ActivityLog');

/** Create a schema to constrain the structure of documents associated with this collection. */
const ActivitySchema = new SimpleSchema({
  owner: {
    type: String,
    optional: false,
  },
  target: {
    type: String,
    optional: false,
  },
  event: {
    type: String,
    optional: false,
  },
  createdAt: {
    type: Date,
    optional: false,
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
ActivityLog.attachSchema(ActivitySchema);

/** Make the collection and schema available to other code. */
export { ActivityLog, ActivitySchema };
