import { Meteor } from 'meteor/meteor';
import { AccountInfo } from '../../api/accountInfo/accountInfo.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding profile info for: ${Meteor.users.findOne(this.userId).username}`);
  AccountInfo.insert(data);
}

/** Initialize the collection if empty. */
if (AccountInfo.find().count() === 0) {
  if (Meteor.settings.defaultAccountInfo) {
    console.log('Creating default account info.');
    Meteor.settings.defaultAccountInfo.map(data => addData(data));
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
