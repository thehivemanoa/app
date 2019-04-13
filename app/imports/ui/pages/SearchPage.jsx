import React from 'react';
import dateFns from 'date-fns';
import { Meteor } from 'meteor/meteor';
import { Loader, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SearchResults from '../components/SearchResults';
import SearchBox from '../components/SearchBox';
import { Sessions } from '../../api/session/session';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    let currentDate = new Date();
    currentDate = dateFns.startOfDay(currentDate);
    const month = dateFns.startOfMonth(currentDate);
    this.state = {
      hideJoined: true,
      hideConflicting: true,
      courses: { 'ICS 311': null, 'ICS 314': null },
      endDate: currentDate,
      startDate: currentDate,
      fromDate: currentDate,
      toDate: currentDate,
      startTime: null,
      endTime: null,
      course: '',
      isMouseDown: false,
      month: month,
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
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    document.remove('mouseup', this.onMouseUp);
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
    const newCourses = { ...this.state.courses };
    newCourses[course] = null;
    this.setState({
      courses: newCourses,
      course: '',
    });
  }

  deleteCourse(course) {
    const newCourses = { ...this.state.courses };
    delete newCourses[course];
    this.setState({
      courses: newCourses,
    });
  }

  setFromDate(fromDate) {
    console.log('mouse down');
    this.setState({
      startDate: fromDate,
      endDate: fromDate,
      fromDate: fromDate,
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
      this.setState({
        startDate: startDate,
        endDate: endDate,
        toDate: toDate,
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

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <Grid container style={{ marginTop: '120px' }}>
          <Grid.Column width={11}>
            <SearchResults sessions={this.props.sessions}/>
          </Grid.Column>
          <Grid.Column width={5}>
            <SearchBox toggleJoined={this.toggleJoined}
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
                       setStartTime={this.setStartTime}
                       month={this.state.month}
                       setEndTime={this.setEndTime}/>
          </Grid.Column>
        </Grid>
    );
  }
}

SearchPage.propTypes = {
  sessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Sessions');
  return {
    sessions: Sessions.find({}).fetch(),
    ready: subscription.ready(),
  };
})(SearchPage);
