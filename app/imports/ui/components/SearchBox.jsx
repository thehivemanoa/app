import React from 'react';
import { Header, Card, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import HideSearchResults from './HideSearchResults';
import FilterCourses from './FilterCourses';
import FilterDateAndTime from './FilterDateAndTime';

export default class SearchResults extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content style={{ textAlign: 'center' }}>
            <Header as="h4" style={{ display: 'inline-block' }}>
              Search
            </Header>
          </Card.Content>
          <Card.Content>
            <List>
              <HideSearchResults toggleJoined={this.props.toggleJoined}
                                 toggleConflicting={this.props.toggleConflicting}/>
              <FilterCourses addCourse={this.props.addCourse}
                             courses={this.props.courses}
                             deleteCourse={this.props.deleteCourse}/>
              <FilterDateAndTime setDateRange={this.props.setDateRange}
                                 setStartTime={this.props.setStartTime}
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
};
