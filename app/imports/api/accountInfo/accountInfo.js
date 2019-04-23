import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const AccountInfo = new Mongo.Collection('Accounts');

/** Create a schema to constrain the structure of documents associated with this collection. */
const AccountSchema = new SimpleSchema({
  username: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  image: String,
  level: String,
  exp: String,
  courses: [String],
  joinedSessions: [String],
  createdSessions: [String],
}, { tracker: Tracker });

/** Attach this schema to the collection. */
AccountInfo.attachSchema(AccountSchema);

/** Make the collection and schema available to other code. */
export { AccountInfo, AccountSchema };
