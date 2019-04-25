import React from 'react';
import dateFns from 'date-fns';
import { Meteor } from 'meteor/meteor';
import { Grid, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';
import { Sessions } from '../../api/session/session';
import Calendar from '../components/Calendar';
import SessionList from '../components/SessionList';
import { Profiles } from '../../api/profile/profile';

const _ = require('underscore');

class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.sessions);
    console.log(this.props.profile);
    const initialDate = new Date();
    this.state = {
      selectedDate: initialDate,
      month: dateFns.startOfMonth(initialDate),
    };
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handlePreviousMonthClick = this.handlePreviousMonthClick.bind(this);
    this.handleNextMonthClick = this.handleNextMonthClick.bind(this);
    this.handlePreviousDayClick = this.handlePreviousDayClick.bind(this);
    this.handleNextDayClick = this.handleNextDayClick.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.isJoined = this.isJoined.bind(this);
  }

  handleLeave(sessionId) {
    const currentUserId = this.props.currentUserId;
    const throwError = function (error) {
      return error ? Bert.alert({ type: 'danger', message: `Leave failed: ${error.message}` }) :
          Bert.alert({ type: 'success', message: 'Leave succeeded' });
    };
    Meteor.users.update(
        currentUserId,
        { $pull: { 'profile.joinedSessions': sessionId } },
        error => throwError(error),
    );
    Sessions.update(
        sessionId,
        { $pull: { attendees: this.props.currentUsername } },
        error => throwError(error),
    );
  }

  handleJoin(sessionId) {
    const currentUserId = this.props.currentUserId;
    const throwError = function (error) {
      return error ? Bert.alert({ type: 'danger', message: `Join failed: ${error.message}` }) :
          Bert.alert({ type: 'success', message: 'Join succeeded' });
    };
    Meteor.users.update(
        currentUserId,
        { $push: { 'profile.joinedSessions': sessionId } },
        error => throwError(error),
    );
    Sessions.update(
        sessionId,
        { $push: { attendees: this.props.currentUsername } },
        error => throwError(error),
    );
  }

  isJoined(sessionId) {
    const joinedSessions = this.props.profile.joinedSessions;
    return _.some(joinedSessions, session => session === sessionId);
  }

  handleDayClick(date) {
    this.setState({
      selectedDate: date,
    });
  }

  handlePreviousMonthClick() {
    const month = dateFns.addMonths(this.state.month, -1);
    this.setState({
      selectedDate: month,
      month: month,
    });
  }

  handleNextMonthClick() {
    const month = dateFns.addMonths(this.state.month, 1);
    this.setState({
      selectedDate: month,
      month: month,
    });
  }

  handlePreviousDayClick() {
    const previousDay = dateFns.addDays(this.state.selectedDate, -1);
    this.setState({
      selectedDate: previousDay,
      month: dateFns.startOfMonth(previousDay),
    });
  }

  handleNextDayClick() {
    const nextDay = dateFns.addDays(this.state.selectedDate, 1);
    this.setState({
      selectedDate: nextDay,
      month: dateFns.startOfMonth(nextDay),
    });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const middleGridStyle = {
      minWidth: '1200px',
      marginTop: '120px',
    };

    return (
        <div>
          <Grid style={middleGridStyle} centered container>
            <Grid.Column width={11}>
              <Calendar selectedDate={this.state.selectedDate}
                        sessions={_.sortBy(this.props.sessions, 'startTime')}
                        month={this.state.month}
                        handlePreviousMonthClick={this.handlePreviousMonthClick}
                        handleNextMonthClick={this.handleNextMonthClick}
                        handleDayClick={this.handleDayClick}/>
            </Grid.Column>
            <Grid.Column width={5}>
              <SessionList
                  handleNextDayClick={this.handleNextDayClick}
                  sessions={this.props.sessions.filter(session => dateFns.isSameDay(
                      session.startTime,
                      this.state.selectedDate,
                  ))}
                  handlePreviousDayClick={this.handlePreviousDayClick}
                  selectedDate={this.state.selectedDate}
                  handleLeave={this.handleLeave}
                  handleJoin={this.handleJoin}
                  isJoined={this.isJoined}
              />
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

CalendarPage.propTypes = {
  currentUsername: PropTypes.string.isRequired,
  currentUserId: PropTypes.string.isRequired,
  sessions: PropTypes.object,
  profiles: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Sessions');
  const subscription2 = Meteor.subscribe('Profile');
  const doc = Profiles.find().fetch();
  return {
    currentUserId: Meteor.user() ? Meteor.user()._id : '',
    currentUsername: Meteor.user() ? Meteor.user().username : '',
    profile: doc[0],
    sessions: Sessions.find({}).fetch(),
    profiles: Profiles.find({}).fetch(),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(CalendarPage);
