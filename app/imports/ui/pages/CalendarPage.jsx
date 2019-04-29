import React from 'react';
import dateFns from 'date-fns';
import { Meteor } from 'meteor/meteor';
import { Grid, Loader, Container } from 'semantic-ui-react';
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
    const profileId = Profiles.findOne({ owner: this.props.currentUsername })._id;
    Profiles.update(
        profileId,
        { $pull: { joinedSessions: sessionId } },
        error => (error ? Bert.alert({ type: 'danger', message: `Leave failed: ${error.message}` }) :
            Bert.alert({ type: 'success', message: 'Leave succeeded' })),
    );
    Sessions.update(
        sessionId,
        { $pull: { attendees: this.props.currentUsername } },
        error => (error ? Bert.alert({ type: 'danger', message: `Leave failed: ${error.message}` }) :
            Bert.alert({ type: 'success', message: 'Leave succeeded' })),
    );
    Sessions.update(
        sessionId,
        {
          $unset: {
            [`hasResponded.${this.props.currentUserId}`]: false,
            [`honeyDistribution.${this.props.currentUserId}`]: 0,
          },
        },
        error => (error ? Bert.alert({ type: 'danger', message: `Leave failed: ${error.message}` }) :
            Bert.alert({ type: 'success', message: 'Leave succeeded' })),
    );
  }

  handleJoin(sessionId) {
    const profileId = Profiles.findOne({ owner: this.props.currentUsername })._id;
    Profiles.update(
        profileId,
        { $addToSet: { joinedSessions: sessionId } },
        error => (error ? Bert.alert({ type: 'danger', message: `Join failed: ${error.message}` }) :
            Bert.alert({ type: 'success', message: 'Join succeeded' })),
    );
    Sessions.update(
        sessionId,
        { $addToSet: { attendees: this.props.currentUsername } },
        error => (error ? Bert.alert({ type: 'danger', message: `Join failed: ${error.message}` }) :
            Bert.alert({ type: 'success', message: 'Join succeeded' })),
    );
    Sessions.update(
        sessionId,
        {
          $set: {
            [`hasResponded.${this.props.currentUserId}`]: false,
            [`honeyDistribution.${this.props.currentUserId}`]: 0,
          },
        },
        error => (error ? Bert.alert({ type: 'danger', message: `Join failed: ${error.message}` }) :
            Bert.alert({ type: 'success', message: 'Join succeeded' })),
    );
  }


  isJoined(sessionId) {
    const joinedSessions = Profiles.findOne({ owner: this.props.currentUsername }).joinedSessions;
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
    return (this.props.ready) ? this.renderPage() :
        <Container className="page-container">
          <Loader active>Getting data</Loader>
        </Container>;
  }

  renderPage() {
    const middleGridStyle = {
      minWidth: '1200px',
      marginTop: '120px',
    };
    console.log(_.map(this.props.sessions, session => session._id));

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
                  sessions={_.sortBy(this.props.sessions.filter(session => dateFns.isSameDay(
                      session.startTime,
                      this.state.selectedDate,
                  )), 'startTime')}
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
  sessions: PropTypes.array.isRequired,
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('MySessions');
  const subscription2 = Meteor.subscribe('Profiles');
  return {
    currentUserId: Meteor.user() ? Meteor.user()._id : '',
    currentUsername: Meteor.user() ? Meteor.user().username : '',
    sessions: Sessions.find({}).fetch(),
    profiles: Profiles.find({}).fetch(),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(CalendarPage);
