import React from 'react';
import dateFns from 'date-fns';
import { List, Divider, Grid, Input, Form, Button, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import TimeSelector from './TimeSelector';

export default class FilterTime extends React.Component {
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
    const style = {
      paddingLeft: '14px',
      paddingRight: '14px',
    };
    if (this.state.isCollapsed) {
      style.display = 'none';
    }

    return (
        <List.Item>
          <List style={{ padding: 0 }}>
            <List.Item>
              <Header as="h3" style={{ display: 'inline-block' }}>Time</Header>
              <Button
                  icon={this.state.isCollapsed ? 'plus' : 'minus'}
                  floated="right"
                  style={{
                    backgroundColor: 'Transparent',
                    paddingRight: 0,
                    paddingTop: '5px',
                    marginBottom: '15px',
                    margin: 0,
                  }}
                  onClick={this.toggleCollapsed}
              />
            </List.Item>
            <List.Item style={style}>
              <Form onSubmit={this.props.onTimeSubmit}>
                <Form.Group>
                  <Form.Input
                      label="From"
                      value={this.props.startTimeText}
                      onChange={this.props.handleChange}
                      name="startTimeText"
                      width={8}
                  />
                  <Form.Input
                      label="To"
                      value={this.props.endTimeText}
                      onChange={this.props.handleChange}
                      name="endTimeText"
                      width={8}
                  />
                </Form.Group>
                <Form.Button style={{ display: 'none' }}></Form.Button>
              </Form>
            </List.Item>
          </List>
        </List.Item>
    );
  }
}

FilterTime.propTypes = {
  onTimeSubmit: PropTypes.func.isRequired,
  startTimeText: PropTypes.string.isRequired,
  endTimeText: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
