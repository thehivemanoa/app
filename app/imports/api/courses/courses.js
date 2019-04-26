import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Courses = new Mongo.Collection('Courses');

/** Create a schema to constrain the structure of documents associated with this collection. */
const CourseSchema = new SimpleSchema({
  course: String,
  description: String,
  // color: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Courses.attachSchema(CourseSchema);

/** Make the collection and schema available to other code. */
export { Courses, CourseSchema };
