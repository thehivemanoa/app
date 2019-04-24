import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Profiles = new Mongo.Collection('Profiles');

/** Create a schema to constrain the structure of documents associated with this collection. */
const ProfileSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  image: String,
  level: String,
  exp: String,
  courses: { type: Object, blackbox: true },
  joinedSessions: { type: Array, required: false },
  'joinedSessions.$': String,
  createdSessions: { type: Array, required: false },
  'createdSessions.$': String,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Profiles.attachSchema(ProfileSchema);

/** Make the collection and schema available to other code. */
export { Profiles, ProfileSchema };
