import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Accounts = new Mongo.Collection('Accounts');

/** Create a schema to constrain the structure of documents associated with this collection. */
const AccountSchema = new SimpleSchema({
  emails: Array,
  'emails.$': Object,
  'emails.$.address': String,
  password: String,
  username: String,
  profile: Object,
  'profile.firstName': String,
  'profile.lastName': String,
  'profile.image': String,
  'profile.level': String,
  'profile.exp': String,
  'profile.courses': Array,
  'profile.courses.$': Object,
  'profile.courses.$.courses': String,
  'profile.courses.$.status': Boolean,
  'profile.joinedSessions': Array,
  'profile.joinedSessions.$': String,
  'profile.createdSessions': Array,
  'profile.createdSessions.$': String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Accounts.attachSchema(AccountSchema);

/** Make the collection and schema available to other code. */
export { Accounts, AccountSchema };
