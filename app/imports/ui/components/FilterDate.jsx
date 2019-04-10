import React from 'react';
import { List, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CalendarRangeSelector from './CalendarRangeSelector';

export default class FilterDate extends React.Component {
  render() {
    return (
        <List.Item>
          <Divider horizontal>Date</Divider>
          <CalendarRangeSelector setDateRange={this.props.setDateRange} endDate={this.props.endDate}/>
        </List.Item>
    );
  }
}

FilterDate.propTypes = {
  setDateRange: PropTypes.func.isRequired,
  endDate: PropTypes.object.isRequired,
};
