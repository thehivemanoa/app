import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { TaskList } from '../../api/taskList/taskList.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log('Adding task');
  TaskList.insert(data);
}

/** Initialize the collection if empty. */
if (TaskList.find().count() === 0) {
  if (Meteor.settings.defaultTaskList) {
    console.log('Creating default tasks.');
    Meteor.settings.defaultTaskList.map(data => addData(data));
  }
}

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('TaskList', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return TaskList.find();
  }
  return this.ready();
});
