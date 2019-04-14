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
              <FilterDate setFromDate={this.props.setFromDate}
                          pressNextMonth={this.props.pressNextMonth}
                          pressPreviousMonth={this.props.pressPreviousMonth}
                          mouseUpChangeMonth={this.props.mouseUpChangeMonth}
                          mouseLeaveChangeMonth={this.props.mouseLeaveChangeMonth}
                          changeMonth={this.props.changeMonth}
                          isInRange={this.props.isInRange}
                          setToDate={this.props.setToDate}
                          startDate={this.props.startDate}
                          endDate={this.props.endDate}
                          startDateText={this.props.startDateText}
                          endDateText={this.props.endDateText}
                          handleChange={this.props.handleChange}
                          handleDateSubmit={this.props.handleDateSubmit}
                          month={this.props.month}/>
              <FilterTime setStartTime={this.props.setStartTime}
                          setEndTime={this.props.setEndTime}/>
            </List>
          </Card.Content>
        </Card>
    );
  }
}

SearchResults.propTypes = {
  month: PropTypes.object.isRequired,
  isInRange: PropTypes.func.isRequired,
  toggleJoined: PropTypes.func.isRequired,
  toggleConflicting: PropTypes.func.isRequired,
  addCourse: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  setFromDate: PropTypes.func.isRequired,
  setToDate: PropTypes.func.isRequired,
  setStartTime: PropTypes.func.isRequired,
  setEndTime: PropTypes.func.isRequired,
  courses: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  course: PropTypes.string.isRequired,
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired,
  pressPreviousMonth: PropTypes.func.isRequired,
  pressNextMonth: PropTypes.func.isRequired,
  mouseUpChangeMonth: PropTypes.func.isRequired,
  mouseLeaveChangeMonth: PropTypes.func.isRequired,
  changeMonth: PropTypes.func.isRequired,
  startDateText: PropTypes.string.isRequired,
  endDateText: PropTypes.string.isRequired,
  handleDateSubmit: PropTypes.func.isRequired,
};
