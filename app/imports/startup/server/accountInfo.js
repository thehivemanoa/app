import { Meteor } from 'meteor/meteor';
import { AccountInfo } from '../../api/accountinfo/accountinfo.js';

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
