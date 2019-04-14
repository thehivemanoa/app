import React from 'react';
import dateFns from 'date-fns';
import { List, Divider, Form, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class FilterTime extends React.Component {
  formatTime(time) {
    return `${dateFns.format(time, 'h')}:${dateFns.format(time, 'mm')} ${dateFns.format(time, 'a')}`;
  }

  render() {
    const options = [];
    const currentDate = new Date();
    let currentTime = dateFns.startOfDay(currentDate);
    while (dateFns.isSameDay(currentTime, currentDate)) {
      currentTime = dateFns.addMinutes(currentTime, 30);
      options.push({ key: this.formatTime(currentTime), text: this.formatTime(currentTime), value: currentTime });
    }

    return (
        <List.Item>
          <Divider horizontal style={{ paddingTop: '10px' }}>Time</Divider>
          <Form>
              <Form.Input label="From"
                          control={Select}
                          options={options}
                          placeholder=""
                          search
                          fluid
                          onChange={this.props.handleChange}
                          name="startTime"/>
              <Form.Input label="To"
                          control={Select}
                          options={options}
                          placeholder=""
                          search
                          fluid
                          onChange={this.props.handleChange}
                          name="endTime"/>
            <Form.Button style={{ display: 'none' }} />
          </Form>
        </List.Item>
    );
  }
}

FilterTime.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
