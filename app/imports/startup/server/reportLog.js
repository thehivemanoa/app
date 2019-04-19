import { Meteor } from 'meteor/meteor';
import { ReportLog } from '../../api/reportLog/reportLog.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding report for: ${data.owner}`);
  ReportLog.insert(data);
}

/** Initialize the collection if empty. */
if (ReportLog.find().count() === 0) {
  if (Meteor.settings.defaultReportLog) {
    console.log('Creating default reportItem.');
    Meteor.settings.defaultReportLog.map(data => addData(data));
  }
}

/** This subscription publishes all documents provided that the user is logged in */
Meteor.publish('ReportLog', function publish() {
  if (this.userId) {
    return ReportLog.find();
  }
  return this.ready();
});
