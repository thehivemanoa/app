import React from 'react';
import dateFns from 'date-fns';
import { Meteor } from 'meteor/meteor';
import { Loader, Grid, Container } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';
import SearchResults from '../components/SearchResults';
import SearchBox from '../components/SearchBox';
import { Sessions } from '../../api/session/session';
import { Profiles } from '../../api/profile/profile';
import SessionCardFlat from '../components/SessionCardFlat';

const _ = require('underscore');

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    const maxDate = new Date(8640000000000000);
    const minDate = new Date(-8640000000000000);
    const startOfDay = dateFns.startOfDay(currentDate);
    const endOfDay = dateFns.endOfDay(currentDate);
    const month = dateFns.startOfMonth(currentDate);
    this.state = {
      hideJoined: false,
      hideConflicting: false,
      courses: {},
      startDate: minDate,
      endDate: maxDate,
      fromDate: currentDate,
      toDate: currentDate,
      startTimeText: this.formatTime(startOfDay),
      endTimeText: this.formatTime(endOfDay),
      startTime: startOfDay,
      endTime: endOfDay,
      course: '',
      isMouseDown: false,
      month: month,
      startDateText: '-\u221E',
      endDateText: '\u221E',
      sortBy: 'startTime',
      ready: false,
    };
    this.toggleJoined = this.toggleJoined.bind(this);
    this.toggleConflicting = this.toggleConflicting.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.addCourse = this.addCourse.bind(this);
    this.setFromDate = this.setFromDate.bind(this);
    this.setToDate = this.setToDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.isInRange = this.isInRange.bind(this);
    this.pressNextMonth = this.pressNextMonth.bind(this);
    this.pressPreviousMonth = this.pressPreviousMonth.bind(this);
    this.mouseUpChangeMonth = this.mouseUpChangeMonth.bind(this);
    this.mouseLeaveChangeMonth = this.mouseLeaveChangeMonth.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.handleDateSubmit = this.handleDateSubmit.bind(this);
    this.handleTimeSubmit = this.handleTimeSubmit.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.isJoined = this.isJoined.bind(this);
    this.onTimeSubmit = this.onTimeSubmit.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  getNumberOfWorkers(session) {
    const attendees = Meteor.users.find({ username: { $in: session.attendees } }).fetch();
    return _.filter(attendees, attendee => !attendee.profile.courses[session.course]).length;
  }

  getNumberOfRoyals(session) {
    const attendees = Meteor.users.find({ username: { $in: session.attendees } }).fetch();
    return _.filter(attendees, attendee => attendee.profile.courses[session.course]).length;
  }

  stringToTime(string) {
    const time = string.split(/[\s:]+/);
    let currentDate = dateFns.startOfDay(new Date());
    if (time[2] === 'pm') {
      currentDate = dateFns.addHours(currentDate, 12);
    } else
      if (time[2] !== 'am') {
        return null;
      }
    currentDate = dateFns.addHours(currentDate, Number(time[0]) % 12);
    currentDate = dateFns.addMinutes(currentDate, Number(time[1]));
    if (!dateFns.isValid(currentDate)) {
      return null;
    }
    return currentDate;
  }

  onTimeSubmit() {
    const startTime = this.stringToTime(this.state.startTimeText);
    const endTime = this.stringToTime(this.state.endTimeText);
    if (startTime && endTime && dateFns.isBefore(startTime, endTime)) {
      this.setState({
        startTime: startTime,
        endTime: endTime,
      });
    } else {
      i
      Bert.alert({ type: 'danger', message: 'Invalid time' });
    }
  }

  formatTime(date) {
    return `${dateFns.format(date, 'h')}:${dateFns.format(date, 'mm')} ${dateFns.format(date, 'a')}`;
  }

  initializeCourses() {
    const courses = Profiles.findOne({ owner: this.props.currentUsername }).courses;
    this.setState({
      courses: _.mapObject(courses, () => null),
    });
  }

  isJoined(sessionId) {
    const joinedSessionIds = Profiles.findOne({ owner: this.props.currentUsername }).joinedSessions;
    return _.some(joinedSessionIds, session => session === sessionId);
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

  getFilteredSessions() {
    let results = [];
    const joinedSessionIds = Profiles.findOne({ owner: this.props.currentUsername }).joinedSessions;
    const joinedSessions = Sessions.find({ _id: { $in: joinedSessionIds } }).fetch();
    const notJoinedSessions = Sessions.find({ _id: { $not: { $in: joinedSessionIds } } }).fetch();
    const A = _.sortBy(joinedSessions, 'startTime');
    const n = A.length;
    const B = _.sortBy(notJoinedSessions, 'endTime');
    const m = B.length;
    const maxDate = new Date(8640000000000000);
    const sentinel = { startTime: maxDate, endTime: maxDate };
    A.push(sentinel);
    B.push(sentinel);
    let i = 0;
    let j = 0;
    let filterValue = null;
    while (i <= n && j <= m && i + j < n + m) {
      if (dateFns.isBefore(A[i].startTime, B[j].endTime)) {
        if (!this.state.hideJoined && this.passesFilter(A[i])) {
          results.push({
            session: A[i],
            isJoined: true,
            isConflicting: false,
          });
        }
        filterValue = A[i].endTime;
        i++;
      } else {
        if (this.passesFilter(B[j]) && (!filterValue || !dateFns.isAfter(filterValue, B[j].startTime))) {
          results.push({
            session: B[j],
            isJoined: false,
            isConflicting: false,
          });
        } else
          if (this.passesFilter(B[j]) && !this.state.hideConflicting) {
            results.push({
              session: B[j],
              isJoined: false,
              isConflicting: true,
            });
          }
        j++;
      }
    }
    if (this.state.sortBy === 'attenbees') {
      results = _.sortBy(results, sessionWrapper => sessionWrapper.session.attendees.length).reverse();
    } else {
      results = _.sortBy(results, sessionWrapper => sessionWrapper.session[this.state.sortBy]);
    }
    return _.map(results, (sessionWrapper, index) => {
      const updateJoined = sessionWrapper.isJoined ? this.handleLeave : this.handleJoin;
      return <SessionCardFlat
          key={index}
          index={results.length - index}
          session={sessionWrapper.session}
          updateJoined={() => updateJoined(sessionWrapper.session._id)}
          isJoined={sessionWrapper.isJoined}
          isConflicting={sessionWrapper.isConflicting}
      />;
    });
  }

  passesFilter(session) {
    return this.isInDateRange(session) && this.isInTimeRange(session) && this.isInCourses(session);
  }

  isInDateRange(session) {
    const startDate = this.state.startDate;
    const endDate = dateFns.endOfDay(this.state.endDate);
    return dateFns.isValid(endDate) ?
        dateFns.isWithinRange(session.date, startDate, endDate) :
        !dateFns.isBefore(session.date, startDate);
  }

  isInTimeRange(session) {
    const startTime = this.state.startTime;
    const endTime = this.state.endTime;
    const adjustedStartTime = dateFns.addDays(
        session.startTime,
        dateFns.differenceInCalendarDays(this.state.startTime, session.startTime),
    );
    const adjustedEndTime = dateFns.addDays(
        session.endTime,
        dateFns.differenceInCalendarDays(this.state.endTime, session.endTime),
    );
    if (!(dateFns.isAfter(startTime, adjustedStartTime) || dateFns.isAfter(adjustedEndTime, endTime))) {
      return true;
    }
    return false;
  }

  isInCourses(session) {
    return _.some(_.keys(this.state.courses), course => course === session.course);
  }

  pressNextMonth() {
    if (this.state.isMouseDown) {
      this.timerId = setTimeout(() => this.timer(1), 1000);
    }
  }

  pressPreviousMonth() {
    if (this.state.isMouseDown) {
      this.timerId = setTimeout(() => this.timer(-1), 1000);
    }
  }

  mouseUpChangeMonth() {
    clearTimeout(this.timerId);
  }

  mouseLeaveChangeMonth() {
    if (this.state.isMouseDown) {
      clearTimeout(this.timerId);
    }
  }

  changeMonth(x) {
    const newMonth = dateFns.addMonths(this.state.month, x);
    this.setState({
      month: newMonth,
    });
  }

  timer(x) {
    const newMonth = dateFns.addMonths(this.state.month, x);
    this.setState({
      month: newMonth,
    });
    this.timerId = setTimeout(() => this.timer(x), 500);
  }

  onMouseUp() {
    console.log('mouse up');
    this.setState({
      isMouseDown: false,
    });
  }

  toggleJoined() {
    this.setState({
      hideJoined: !this.state.hideJoined,
    });
  }

  toggleConflicting() {
    this.setState({
      hideConflicting: !this.state.hideConflicting,
    });
  }

  addCourse(course) {
    if (this.props.courses[course] !== undefined) {
      const newCourses = { ...this.state.courses };
      newCourses[course] = null;
      this.setState({
        courses: newCourses,
        course: '',
      });
    } else {
      Bert.alert({ type: 'danger', message: `The course ${course} is not one of your courses.` });
    }
  }

  deleteCourse(course) {
    const newCourses = { ...this.state.courses };
    delete newCourses[course];
    this.setState({
      courses: newCourses,
    });
  }

  formatDate(date) {
    const minDate = new Date(-8639999999999999);
    const maxDate = new Date(8640000000000000);
    if (dateFns.isSameSecond(date, minDate)) {
      return '-\u221E';
    }
    if (dateFns.isSameDay(date, maxDate)) {
      return '\u221E';
    }
    return `${dateFns.format(date, 'M')}/${dateFns.format(date, 'D')}/${dateFns.format(date, 'YYYY')}`;
  }

  setFromDate(fromDate) {
    const formattedDate = this.formatDate(fromDate);
    this.setState({
      startDate: fromDate,
      endDate: fromDate,
      fromDate: fromDate,
      startDateText: formattedDate,
      endDateText: formattedDate,
      isMouseDown: true,
    });
  }

  setToDate(toDate) {
    if (this.state.isMouseDown) {
      let startDate;
      let endDate;
      if (dateFns.isBefore(toDate, this.state.fromDate)) {
        startDate = toDate;
        endDate = this.state.fromDate;
      } else {
        endDate = toDate;
        startDate = this.state.fromDate;
      }
      const formattedStartDate = this.formatDate(startDate);
      const formattedEndDate = this.formatDate(endDate);
      this.setState({
        startDate: startDate,
        endDate: endDate,
        toDate: toDate,
        startDateText: formattedStartDate,
        endDateText: formattedEndDate,
      });
    }
  }

  isInRange(date) {
    return !(dateFns.isBefore(date, this.state.startDate) || dateFns.isAfter(date, this.state.endDate));
  }

  handleChange(event, { name, value }) {
    this.setState({
      [name]: value,
    });
  }

  stringToDate(string) {
    const formattedDate = string.trim().split('/');
    return new Date(formattedDate[2], formattedDate[0] - 1, formattedDate[1]);
  }

  handleDateSubmit() {
    let startDate = this.stringToDate(this.state.startDateText);
    let endDate = this.stringToDate(this.state.endDateText);
    if (this.state.startDateText === '-\u221E') {
      startDate = new Date(-8640000000000000);
    }
    if (this.state.endDateText === '\u221E') {
      endDate = new Date(8640000000000000);
    }
    if (dateFns.isValid(startDate) && dateFns.isValid(endDate)) {
      this.setState({
        startDate: startDate,
        endDate: endDate,
      });
    } else {
      Bert.alert({ type: 'danger', message: 'Invalid date' });
    }
  }

  handleTimeSubmit() {
    console.log('hello');
  }

  render() {
    if (!this.state.ready && this.props.ready) {
      this.initializeCourses();
      this.setState({
        ready: true,
      });
    }
    return (this.props.ready) ? this.renderPage() :
        <Container className="page-container">
          <Loader active>Getting data</Loader>
        </Container>;
  }

  renderPage() {
    return (
        <Grid container style={{ marginTop: '145px', marginBottom: '15px' }}>
          <Grid.Column width={5}>
            <SearchBox
                toggleJoined={this.toggleJoined}
                pressNextMonth={this.pressNextMonth}
                pressPreviousMonth={this.pressPreviousMonth}
                mouseUpChangeMonth={this.mouseUpChangeMonth}
                mouseLeaveChangeMonth={this.mouseLeaveChangeMonth}
                changeMonth={this.changeMonth}
                isInRange={this.isInRange}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                courses={this.state.courses}
                course={this.state.course}
                handleChange={this.handleChange}
                toggleConflicting={this.toggleConflicting}
                addCourse={this.addCourse}
                deleteCourse={this.deleteCourse}
                setFromDate={this.setFromDate}
                setToDate={this.setToDate}
                month={this.state.month}
                startDateText={this.state.startDateText}
                endDateText={this.state.endDateText}
                handleDateSubmit={this.handleDateSubmit}
                startTimeText={this.state.startTimeText}
                endTimeText={this.state.endTimeText}
                onTimeSubmit={this.onTimeSubmit}
                sortBy={this.state.sortBy}
            />
          </Grid.Column>
          <Grid.Column width={11}>
            <SearchResults
                sessionCards={this.getFilteredSessions()}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                startTime={this.state.startTime}
                endTime={this.state.endTime}
                courses={this.state.courses}
                hideJoined={this.state.hideJoined}
                hideConflicting={this.state.hideConflicting}
                sortBy={this.state.sortBy}
                isJoined={this.isJoined}
                handleJoin={this.handleJoin}
                handleLeave={this.handleLeave}
            />
          </Grid.Column>
        </Grid>
    );
  }
}

SearchPage.propTypes = {
  courses: PropTypes.object.isRequired,
  currentUserId: PropTypes.string.isRequired,
  currentUsername: PropTypes.string.isRequired,
  profiles: PropTypes.array.isRequired,
  sessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.

  const subscription = Meteor.subscribe('Sessions');
  const subscription2 = Meteor.subscribe('Profiles');
  let courses = {};
  if (subscription.ready() && subscription2.ready() && Meteor.user()) {
    courses = Profiles.findOne({ owner: Meteor.user().username }).courses;
  }
  return {
    courses: courses,
    currentUserId: Meteor.user() ? Meteor.user()._id : '',
    currentUsername: Meteor.user() ? Meteor.user().username : '',
    profiles: Profiles.find({}).fetch(),
    sessions: Sessions.find({}).fetch(),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(SearchPage);
