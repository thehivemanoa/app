import React from 'react';
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
    this.state = {
      hideJoined: true,
      hideConflicting: true,
      courses: { 'ICS 311': null },
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
    };
    this.toggleJoined = this.toggleJoined.bind(this);
    this.toggleConflicting = this.toggleConflicting.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.addCourse = this.addCourse.bind(this);
    this.setDateRange = this.setDateRange.bind(this);
    this.setStartTime = this.setStartTime.bind(this);
    this.setEndTime = this.setEndTime.bind(this);
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
    });
  }

  deleteCourse(course) {
    const newCourses = { ...this.state.courses };
    delete newCourses[course];
    this.setState({
      courses: newCourses,
    });
  }

  setDateRange(startDate, endDate) {
    this.setState({
      startDate: startDate,
      endDate: endDate,
    });
  }

  setStartTime(startTime) {
    this.setState({
      startTime: startTime,
    });
  }

  setEndTime(endTime) {
    this.setState({
      endTime: endTime,
    });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <Grid>
          <Grid.Column width={11}>
            <SearchResults/>
          </Grid.Column>
          <Grid.Column width={5}>
            <SearchBox toggleJoined={this.toggleJoined}
                       courses={this.state.courses}
                       toggleConflicting={this.toggleConflicting}
                       addCourse={this.addCourse}
                       deleteCourse={this.deleteCourse}
                       setDateRange={this.setDateRange}
                       setStartTime={this.setStartTime}
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
