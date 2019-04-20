import React from 'react';
import { Header, Button, List, Select, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const _ = require('underscore');

export default class SortByOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed() {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });
  }

  render() {
    const style = {
      paddingLeft: '14px',
      paddingRight: '14px',
      marginTop: '5px',
      marginBottom: '30px',
    };
    if (this.props.sortCollapse) {
      style.display = 'none';
    }
    const options = [
      { key: 'title', text: 'Title', value: 'title' },
      { key: 'course', text: 'Course', value: 'course' },
      { key: 'start time', text: 'Start Time', value: 'startTime' },
      { key: 'end time', text: 'End Time', value: 'endTime' },
      { key: 'attenbees', text: 'Attenbees', value: 'attenbees' },
      { key: 'royal to worker', text: 'Royal : Worker', value: 'royalWorker' },
    ];

    return (
        <List style={{ paddingLeft: '14px', paddingRight: '14px', marginTop: '14px', marginBottom: '14px' }}>
          <List.Item>
            <Header as="h4" style={{ display: 'inline-block', lineHeight: '35px' }}>Sort</Header>
            <Button
                icon={this.props.sortCollapse ? 'plus' : 'minus'}
                floated="right"
                style={{
                  backgroundColor: 'Transparent',
                  paddingRight: 0,
                  margin: 0,
                }}
                onClick={this.props.toggleCollapse}
            />
          </List.Item>
          <List.Item style={style}>
          <Form>
            <Form.Input control={Select}
                        options={options}
                        search
                        fluid
                        defaultValue='startTime'
                        onChange={this.props.handleChange}
                        name="sortBy"/>
          </Form>
          </List.Item>
        </List>
    );
  }
}

SortByOptions.propTypes = {
  sortBy: PropTypes.string.isRequired,
  toggleCollapse: PropTypes.func.isRequired,
  sortCollapse: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};
