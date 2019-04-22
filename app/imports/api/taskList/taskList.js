import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const TaskList = new Mongo.Collection('TaskList');

/** Create a schema to constrain the structure of documents associated with this collection. */
const TaskSchema = new SimpleSchema({
  task: {
    type: String,
    optional: false,
  },
  createdAt: {
    type: Date,
    optional: false,
  },
  isDone: {
    type: Boolean,
    optional: false,
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
TaskList.attachSchema(TaskSchema);

/** Make the collection and schema available to other code. */
export { TaskList, TaskSchema };
