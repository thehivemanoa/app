import React from 'react';
import { Divider, List, Select, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class SortByOptions extends React.Component {
  render() {
    const options = [
      { key: 'title', text: 'Title', value: 'title' },
      { key: 'course', text: 'Course', value: 'course' },
      { key: 'date', text: 'Date', value: 'date' },
      { key: 'start time', text: 'Start Time', value: 'startTime' },
      { key: 'end time', text: 'End Time', value: 'endTime' },
      { key: 'attenbees', text: 'Attenbees', value: 'attenbees' },
      { key: 'royal to worker', text: 'Royal : Worker', value: 'royalWorker' },
    ];

    return (
        <List.Item style={{ marginTop: '10px' }}>
          <Divider horizontal>Sort</Divider>
          <Form>
            <Form.Input control={Select}
                        options={options}
                        search
                        fluid
                        onChange={this.props.handleChange}
                        name="startTime"/>
          </Form>
        </List.Item>
    );
  }
}

SortByOptions.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
