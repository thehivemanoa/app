import React from 'react';
import { Header, Card, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import HideSearchResults from './HideSearchResults';
import FilterCourses from './FilterCourses';
import FilterDate from './FilterDate';
import FilterTime from './FilterTime';

export default class SearchResults extends React.Component {
  render() {
    return (
        <Card fluid>
          <Card.Content style={{ textAlign: 'center' }}>
            <Header as="h3" style={{ display: 'inline-block' }}>
              Search
            </Header>
          </Card.Content>
          <Card.Content>
            <List>
              <HideSearchResults toggleJoined={this.props.toggleJoined}
                                 toggleConflicting={this.props.toggleConflicting}/>
              <FilterCourses addCourse={this.props.addCourse}
                             handleChange={this.props.handleChange}
                             course={this.props.course}
                             courses={this.props.courses}
                             deleteCourse={this.props.deleteCourse}/>
              <FilterDate setDateRange={this.props.setDateRange}
                          endDate={this.props.endDate}/>
              <FilterTime setStartTime={this.props.setStartTime}
                          setEndTime={this.props.setEndTime}/>
            </List>
          </Card.Content>
        </Card>
    );
  }
}

SearchResults.propTypes = {
  toggleJoined: PropTypes.func.isRequired,
  toggleConflicting: PropTypes.func.isRequired,
  addCourse: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  setDateRange: PropTypes.func.isRequired,
  setStartTime: PropTypes.func.isRequired,
  setEndTime: PropTypes.func.isRequired,
  courses: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  course: PropTypes.string.isRequired,
  endDate: PropTypes.object.isRequired,
};
