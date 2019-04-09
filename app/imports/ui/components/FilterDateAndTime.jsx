import React from 'react';
import { List, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class FilterDateAndTime extends React.Component {
  render() {
    return (
        <List.Item>
          <Divider horizontal>Date and Time</Divider>
        </List.Item>
    );
  }
}

FilterDateAndTime.propTypes = {
  setDateRange: PropTypes.func.isRequired,
  setStartTime: PropTypes.func.isRequired,
  setEndTime: PropTypes.func.isRequired,
};
