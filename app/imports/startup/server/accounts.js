import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { AccountInfo } from '../../api/accountInfo/accountInfo.js';

/* eslint-disable no-console */

function createUser(email, password, firstName, lastName, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** use Meteor.call to call defined methods */
Meteor.methods({
  serverCreateUser: function (email, password, firstName, lastName, role) {
    console.log(`  Creating user ${email}.`);
    const userID = Accounts.createUser({
      username: email,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
    if (role === 'admin') {
      Roles.addUsersToRoles(userID, 'admin');
    }
    /** set default items */
    const image = 'https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif?w=640';
    const level = 1;
    const exp = 0;
    const courses = [];
    const joinedSessions = [];
    const createdSessions = [];
    AccountInfo.insert({
      username: email,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      image: image,
      level: level,
      exp: exp,
      courses: courses,
      joinedSessions: joinedSessions,
      createdSessions: createdSessions,
    });
    Meteor.publish(userID);
  },
});

/** When running app for first time, pass a settings file to set up a default user account. */
if ((Meteor.users.find().count() === 0)) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ email, password, firstName, lastName, role }) => createUser(email, password, firstName, lastName, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
