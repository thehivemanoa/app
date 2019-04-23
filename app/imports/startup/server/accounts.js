import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { AccountInfo } from '../../api/accountInfo/accountInfo.js';

/* eslint-disable no-console */

function createUser(firstName, lastName, email, password, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    firstName: firstName,
    lastName: lastName,
    username: email,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** When running app for first time, pass a settings file to set up a default user account. */
if ((Meteor.users.find().count() === 0) && (AccountInfo.find().count() === 0)) {
  if (Meteor.settings.defaultAccounts && Meteor.settings.defaultAccountInfo) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ email, password, role }) => createUser(email, password, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}

/** Initialize the collection if empty. */
if (AccountInfo.find().count() === 0) {
  if (Meteor.settings.defaultAccountInfo) {
    console.log('Creating default account info.');
    Meteor.settings.defaultAccountInfo.map(meteorData => Meteor.settings.defaultAccountInfoaddData(meteorData));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('AccountInfo', function publish() {
  if (this.userId) {
    const id = Meteor.users.findOne(this.userId);
    return AccountInfo.find({ owner: id });
  }
  return this.ready();
});
