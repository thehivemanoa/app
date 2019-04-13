import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import { Grid, Button, Container } from 'semantic-ui-react';
import TinyCell from './TinyCell';

export default class TinyCalendar extends React.Component {
  render() {
    const dateContainerStyle = {
      padding: 0,
      height: '30px',
    };
    const weekContainerStyle = {
      padding: 0,
    };

    const weeks = [];
    const startOfFirstWeek = dateFns.startOfWeek(this.props.month);
    const startOfLastWeek = dateFns.startOfWeek(dateFns.endOfMonth(this.props.month));
    let startOfCurrentWeek = startOfFirstWeek;
    while (!dateFns.isAfter(startOfCurrentWeek, startOfLastWeek)) {
      const days = [];
      for (let i = 0; i < 7; i++) {
        const date = dateFns.addDays(startOfCurrentWeek, i);
        days.push(
            <Grid.Column key={date} style={dateContainerStyle}>
              <TinyCell date={date}
                        isInRange={this.props.isInRange(date)}
                        setFromDate={() => this.props.setFromDate(date)}
                        setToDate={() => this.props.setToDate(date)} />
            </Grid.Column>,
        );
      }
      weeks.push(
          <Grid.Row columns={7} key={startOfCurrentWeek} style={weekContainerStyle}>
            {days}
          </Grid.Row>,
      );
      startOfCurrentWeek = dateFns.addWeeks(startOfCurrentWeek, 1);
    }

    return (
          <Grid style={{ paddingTop: '1px', paddingLeft: '2px', paddingRight: '1px' }}>
            {weeks}
          </Grid>
    );
  }
}

TinyCalendar.propTypes = {
  month: PropTypes.object.isRequired,
  isInRange: PropTypes.func.isRequired,
  setToDate: PropTypes.func.isRequired,
  setFromDate: PropTypes.func.isRequired,
  endDate: PropTypes.object.isRequired,
  startDate: PropTypes.object.isRequired,
};
