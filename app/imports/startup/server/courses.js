import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Courses } from '../../api/courses/courses.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.course}`);
  Courses.insert(data);
}

/** Initialize the collection if empty. */
if (Courses.find().count() === 0) {
  if (Meteor.settings.defaultCourses) {
    console.log('Creating default course list.');
    Meteor.settings.defaultCourses.map(data => addData(data));
  }
}

/** This subscription publishes all documents provided that the user is logged in */
Meteor.publish('Courses', function publish() {
  if (this.userId) {
    return Courses.find();
  }
  return this.ready();
});
