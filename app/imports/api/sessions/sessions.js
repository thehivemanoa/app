import { Meteor } from 'meteor/meteor';
import dateFns from 'date-fns';
import { Sessions } from '../../api/sessions/sessions.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.title} (${data.owner})`);
  const { startOffSetFromCurrentDay, endOffSetFromCurrentDay } = data;
  const currentTime = new Date();
  const currentDay = dateFns.startOfDay(currentTime);
  const startTime = dateFns.addHours(currentDay, Number(startOffSetFromCurrentDay));
  const endTime = dateFns.addHours(currentDay, Number(endOffSetFromCurrentDay));
  const date = dateFns.startOfDay(startTime);
  const session = {
    title: data.title,
    course: data.course,
    description: data.description,
    date: date,
    startTime: startTime,
    endTime: endTime,
    attendees: [data.owner],
    isCancelled: data.isCancelled,
    owner: data.owner,
  };
  Sessions.insert(session);
}

/** Initialize the collection if empty. */
if (Sessions.find().count() === 0) {
  if (Meteor.settings.defaultSessions) {
    console.log('Creating default sessions.');
    Meteor.settings.defaultSessions.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Sessions', function publish() {
  if (this.userId) {
    return Sessions.find();
  }
  return this.ready();
});

Meteor.publish('MySessions', function publish() {
  if (this.userId) {
    const sessionIds = Meteor.users.find(this.userId).fetch()[0].profile.joinedSessions;
    return Sessions.find({ _id: { $in: sessionIds } });
  }
  return this.ready();
});
