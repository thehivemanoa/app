import { Meteor } from 'meteor/meteor';
import { AccountInfo } from '../../api/accountinfo/accountinfo.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  AccountInfo.insert(data);
}

/** Initialize the collection if empty. */
if (AccountInfo.find().count() === 0) {
  if (Meteor.settings.defaultAccountInfo) {
    console.log('Creating default Accounts.');
    Meteor.settings.defaultAccountInfo.map(data => addData(data));
  }
}

/** This subscription publishes all documents regardless of user */
Meteor.publish('AccountInfo', function publish() {
  if (this.userId) {

    return AccountInfo.find({});
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user */
Meteor.publish('AccountInfo', function publish() {
  if (this.userId) {
    return AccountInfo.find({});
  }
  return this.ready();
});

/** This subscription publishes all documents owned by a specific account. */
Meteor.publish('AccountProfileInfo', function publish() {
  const username = Meteor.users.findOne(this.userId).username;
  if (this.userId) {
    return AccountInfo.find({ owner: username });
  }
  return this.ready();
});
