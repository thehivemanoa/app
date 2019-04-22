import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import { Card, Header, Divider, Container, List } from 'semantic-ui-react';
import isAfter from 'date-fns/is_after';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';
import SessionCard from './SessionCard';

const _ = require('underscore');

export default class UpcomingSessionList extends React.Component {
  render() {
    const date = this.props.selectedDate;

    const upcomingSessions = _.sortBy(_.filter(this.props.sessions, (session) => isAfter(date, session.startTime), 'startTime'));

    const groupedSessions = _.groupBy(upcomingSessions, function (session) {
      return startOfWeek(session.startTime);
    });
    /** groupedSessions returns object grouped by startTime as keys:
     *  {startTime: [session1, sessions2], startTime: [session3]}
     */
    console.log('hello');
    console.log(groupedSessions);
    const formattedDates = _.map(_.keys(groupedSessions), startDate => {
      const startDayOfTheWeek = dateFns.format(startDate, 'dddd');
      const startMonth = dateFns.format(startDate, 'MMM');
      const startDayOfTheMonth = dateFns.format(startDate, 'DD');
      const endDate = endOfWeek(startDate);
      const endDayOfTheWeek = dateFns.format(endDate, 'dddd');
      const endMonth = dateFns.format(endDate, 'MMM');
      const endDayOfTheMonth = dateFns.format(endDate, 'DD');
      return (`${startDayOfTheWeek}, ${startMonth} ${startDayOfTheMonth} - ${endDayOfTheWeek}, ${endMonth} ${endDayOfTheMonth}`);
    });
    console.log(formattedDates);
    /** formattedDates array returns new array of keys as formatted start to end dates:
     * ['start-end', 'start-end', 'start-end'] */

    console.log(_.values(groupedSessions));
    const sessionCards =
        _.map(_.values(groupedSessions), (sessionsArray) => {
          return _.map(sessionsArray, (session) => {
            console.log(session);
            const isJoined = this.props.isJoined(session._id);
            const handleUpdate = isJoined ? this.props.handleLeave : this.props.handleJoin;
            console.log(isJoined);
            return (
                <SessionCard
                    key={session.startTime}
                    session={session}
                    fluid
                    handleUpdate={() => handleUpdate(session._id)}
                    isJoined={isJoined}
                />
            );
          });
        });

    console.log(sessionCards);
    /** sessionCards array returns new array of grouped session cards arrays of keys as formatted start to end dates:
     * [ [{sessionCard1}, {sessionCard2}], [{sessionCard3}] ] */

    const groupedCards = _.object(formattedDates, sessionCards);
    /** groupedCards returns new abject where keys are formatted dates and values are arrays of session cards:
     * {'start-end': [{sessionCard1}, {sessionCard2}], 'start-end': {sessionCard3}]} */

    console.log(groupedCards);
    /** if there are no upcoming sessions, return "no upcoming sessions" message */
    if (_.isEmpty(groupedCards)) {
      return (
          <Header>
            You have no upcoming sessions.
          </Header>
      );
    }

    console.log('how are you');
    const containers = [];
    /** return group of cards for each week */
    _.each(formattedDates, (formattedDate, index) => {
      const listItem = (<List.Item className="session_weekly_list" key={index}>
            <Divider horizontal><h2>{formattedDate}</h2></Divider>
            <Card.Group centered items={groupedCards[formattedDate]}/>
          </List.Item>
      );
      console.log(listItem);
      containers.push(listItem);
    });

    return (
        <List>
          {containers}
        </List>
    );

  }
}

UpcomingSessionList.propTypes = {
  isJoined: PropTypes.func.isRequired,
  handleJoin: PropTypes.func.isRequired,
  handleLeave: PropTypes.func.isRequired,
  sessions: PropTypes.array.isRequired,
  selectedDate: PropTypes.object.isRequired,
};
