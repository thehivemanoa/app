import React from 'react';
import { Header, Card, List, Divider, Button, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import HideOptions from './HideOptions';
import FilterCourses from './FilterCourses';
import FilterDate from './FilterDate';
import FilterTime from './FilterTime';
import SortByOptions from './SortByOptions';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      hideCollapse: true,
      sortCollapse: true,
      timeCollapse: true,
      dateCollapse: true,
      courseCollapse: true,
    };
    this.toggleCollapseFilter = this.toggleCollapseFilter.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  toggleCollapseFilter(name) {
    this.setState({
      [name]: !this.state[name],
    });
  }

  toggleCollapse() {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
      hideCollapse: !this.state.isCollapsed,
      sortCollapse: !this.state.isCollapsed,
      timeCollapse: !this.state.isCollapsed,
      dateCollapse: !this.state.isCollapsed,
      courseCollapse: !this.state.isCollapsed,
    });
  }

  render() {
    return (
        <Card fluid>
          <Card.Content>
            <Input
                placeholder="Search"
                icon="search"
                style={{
                  width: '90%',
                }}
            />
            <Button
                icon={this.state.isCollapsed ? 'plus' : 'minus'}
                onClick={this.toggleCollapse}
                floated="right"
                style={{
                  paddingRight: 0,
                  paddingLeft: 0,
                  backgroundColor: 'Transparent',
                }}
            />
          </Card.Content>
          <Card.Content style={{ padding: 0 }}>
            <SortByOptions
                handleChange={this.props.handleChange}
                sortCollapse={this.state.sortCollapse}
                toggleCollapse={() => this.toggleCollapseFilter('sortCollapse')}
                sortBy={this.props.sortBy}
            />
            <Divider style={{ margin: 0 }}/>
            <HideOptions
                toggleJoined={this.props.toggleJoined}
                toggleConflicting={this.props.toggleConflicting}
                hideCollapse={this.state.hideCollapse}
                toggleCollapse={() => this.toggleCollapseFilter('hideCollapse')}
            />
            <Divider style={{ margin: 0 }}/>
            <FilterTime
                handleChange={this.props.handleChange}
                startTimeText={this.props.startTimeText}
                endTimeText={this.props.endTimeText}
                onTimeSubmit={this.props.onTimeSubmit}
                timeCollapse={this.state.timeCollapse}
                toggleCollapse={() => this.toggleCollapseFilter('timeCollapse')}
            />
            <Divider style={{ margin: 0 }}/>
            <FilterDate
                setFromDate={this.props.setFromDate}
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
                month={this.props.month}
                dateCollapse={this.state.dateCollapse}
                toggleCollapse={() => this.toggleCollapseFilter('dateCollapse')}
            />
            <Divider style={{ margin: 0 }}/>
            <FilterCourses
                addCourse={this.props.addCourse}
                handleChange={this.props.handleChange}
                course={this.props.course}
                courses={this.props.courses}
                deleteCourse={this.props.deleteCourse}
                courseCollapse={this.state.courseCollapse}
                toggleCollapse={() => this.toggleCollapseFilter('courseCollapse')}
            />
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
  startTimeText: PropTypes.string.isRequired,
  endTimeText: PropTypes.string.isRequired,
  onTimeSubmit: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
};
