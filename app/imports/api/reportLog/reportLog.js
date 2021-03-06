import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const ReportLog = new Mongo.Collection('ReportLog');

/** Create a schema to constrain the structure of documents associated with this collection. */
const ReportSchema = new SimpleSchema({
  owner: String,
  target: String,
  description: String,
  createdAt: Date,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
ReportLog.attachSchema(ReportSchema);

/** Make the collection and schema available to other code. */
export { ReportLog, ReportSchema };
