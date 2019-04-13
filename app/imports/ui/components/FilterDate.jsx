import React from 'react';
import { List, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CalendarRangeSelector from './CalendarRangeSelector';

export default class FilterDate extends React.Component {
  render() {
    return (
        <List.Item style={{ marginBottom: '30px' }}>
          <Divider horizontal>Date</Divider>
          <CalendarRangeSelector isInRange={this.props.isInRange}
                                 pressNextMonth={this.props.pressNextMonth}
                                 pressPreviousMonth={this.props.pressPreviousMonth}
                                 mouseUpChangeMonth={this.props.mouseUpChangeMonth}
                                 mouseLeaveChangeMonth={this.props.mouseLeaveChangeMonth}
                                 changeMonth={this.props.changeMonth}
                                 setFromDate={this.props.setFromDate}
                                 setToDate={this.props.setToDate}
                                 startDate={this.props.startDate}
                                 endDate={this.props.endDate}
                                 month={this.props.month} />
        </List.Item>
    );
  }
}

FilterDate.propTypes = {
  month: PropTypes.object.isRequired,
  isInRange: PropTypes.func.isRequired,
  setToDate: PropTypes.func.isRequired,
  setFromDate: PropTypes.func.isRequired,
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired,
  pressPreviousMonth: PropTypes.func.isRequired,
  pressNextMonth: PropTypes.func.isRequired,
  mouseUpChangeMonth: PropTypes.func.isRequired,
  mouseLeaveChangeMonth: PropTypes.func.isRequired,
  changeMonth: PropTypes.func.isRequired,
};
