import React from 'react';
import { List, Divider, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class FilterTime extends React.Component {
  render() {
    return (
        <List.Item>
          <Divider horizontal style={{ paddingTop: '10px' }}>Time</Divider>
          <Form>
            <Form.Group>
              <Form.Input label="Start Time" placeholder="" width={8}/>
              <Form.Input label="End Time" placeholder="" width={8}/>
            </Form.Group>
          </Form>
        </List.Item>
    );
  }
}

FilterTime.propTypes = {
  setStartTime: PropTypes.func.isRequired,
  setEndTime: PropTypes.func.isRequired,
};
