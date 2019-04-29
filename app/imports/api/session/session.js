import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Sessions = new Mongo.Collection('Sessions');

/** Create a schema to constrain the structure of documents associated with this collection. */
const SessionSchema = new SimpleSchema({
  title: String,
  course: String,
  description: { type: String, required: false },
  date: Date,
  startTime: Date,
  endTime: Date,
  attendees: Array,
  'attendees.$': String,
  honeyDistribution: { type: Object, blackbox: true, required: false },
  hasResponded: { type: Object, blackbox: true, required: false },
  respondents: { type: Number, required: false },
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Sessions.attachSchema(SessionSchema);

/** Make the collection and schema available to other code. */
export { Sessions, SessionSchema };
