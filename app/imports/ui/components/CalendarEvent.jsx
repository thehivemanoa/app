import React from 'react';
import dateFns from 'date-fns';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class CalendarEvent extends React.Component {
  render() {
    const colors = {
      'ICS 311': '#E692F8',
      'ICS 314': '#FFB4B0',
    };
    const startTime = this.props.session.startTime;
    const endTime = this.props.session.endTime;
    const formattedStartTime = `${dateFns.format(startTime, 'h')}:${dateFns.format(startTime, 'mm')}` +
        ` ${dateFns.format(startTime, 'a')}`;
    const formattedEndTime = `${dateFns.format(endTime, 'h')}:${dateFns.format(endTime, 'mm')}` +
        ` ${dateFns.format(endTime, 'a')}`;
    const calendarEvent = {
      height: '30px',
      fontSize: '10px',
      backgroundColor: colors[this.props.session.course],
      textAlign: 'left',
    };
    return (
        <List.Item style={calendarEvent}>
            {`${formattedStartTime} - ${formattedEndTime}`}
            <br/>
            {this.props.session.title}
        </List.Item>
    );
  }
}

CalendarEvent.propTypes = {
  session: PropTypes.object.isRequired,
};
