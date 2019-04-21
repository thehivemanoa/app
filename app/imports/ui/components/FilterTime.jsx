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
      paddingRight: '21px',
      marginTop: '15px',
      marginBottom: '35px',
    };
    if (this.props.timeCollapse) {
      style.display = 'none';
    }

    return (
        <List style={{ paddingLeft: '21px', paddingRight: '14px', marginTop: '4px', marginBottom: '4px' }}>
          <List.Item>
            <Header as="h4" style={{ display: 'inline-block', lineHeight: '35px' }}>Time</Header>
            <Button
                icon={this.props.timeCollapse ? 'plus' : 'minus'}
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
    );
  }
}

FilterTime.propTypes = {
  timeCollapse: PropTypes.bool.isRequired,
  toggleCollapse: PropTypes.func.isRequired,
  onTimeSubmit: PropTypes.func.isRequired,
  startTimeText: PropTypes.string.isRequired,
  endTimeText: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
