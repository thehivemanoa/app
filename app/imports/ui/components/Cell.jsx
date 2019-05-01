import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import { Grid, List, Button } from 'semantic-ui-react';
import CalendarEvent from './CalendarEvent';

export default class Cell extends React.Component {
  render() {
    const events = this.props.sessions.map((session, index) => <CalendarEvent key={index} session={session}/>);
    const columnStyle = {
      height: '100px',
      padding: '3px',
    };
    const buttonStyle = {
      backgroundColor: 'Transparent',
      border: 'none',
      boxShadow: 'none',
      width: '100%',
      height: '100%',
      paddingTop: '15%',
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
      position: 'relative',
    };
    const listStyle = {
      padding: 0,
      width: '100%',
      height: '100%',
      marginTop: '5px',
    };
    const dateStyle = {
      position: 'absolute',
      left: '90%',
      top: '5%',
      transform: 'translate(-50%, -50%)',
      margin: '3px',
      fontSize: '12px',
    };
    const overflowStyle = {
      height: '10px',
      fontSize: '8px',
    };

    return (
        <Grid.Column style={columnStyle}>
          <Button style={buttonStyle}
                  onClick={this.props.handleDayClick}>
            <p style={dateStyle}>
              {dateFns.getDate(this.props.date)}
            </p>
            <List style={listStyle}>
              {events.slice(0, 2)}
              <List.Item style={overflowStyle}>
                {this.props.sessions.length > 2 ? `+${this.props.sessions.length - 2} more` : ''}
              </List.Item>
            </List>
          </Button>
        </Grid.Column>
    );
  }
}

Cell.propTypes = {
  sessions: PropTypes.array.isRequired,
  handleDayClick: PropTypes.func.isRequired,
  date: PropTypes.object.isRequired,
};
