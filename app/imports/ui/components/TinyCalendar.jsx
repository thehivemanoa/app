import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import { Grid, Button } from 'semantic-ui-react';

export default class TinyCalendar extends React.Component {
  render() {
    const dateStyle = {
      height: '15px',
      width: '100%',
      backgroundColor: 'Transparent',
      padding: 0,
      margin: 0,
    };
    const dateContainerStyle = {
      padding: 0,
    };
    const weekContainerStyle = {
      paddingTop: '3px',
      paddingBottom: '3px',
    };

    const weeks = [];
    const month = dateFns.startOfMonth(this.props.endDate);
    const startOfFirstWeek = dateFns.startOfWeek(month);
    const startOfLastWeek = dateFns.startOfWeek(dateFns.endOfMonth(month));
    let startOfCurrentWeek = startOfFirstWeek;
    while (!dateFns.isAfter(startOfCurrentWeek, startOfLastWeek)) {
      const days = [];
      for (let i = 0; i < 7; i++) {
        const date = dateFns.addDays(startOfCurrentWeek, i);
        days.push(
            <Grid.Column key={date} style={dateContainerStyle}>
              <Button style={dateStyle}>{dateFns.format(date, 'D')}</Button>
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
        <Grid>
          {weeks}
        </Grid>
    );
  }
}

TinyCalendar.propTypes = {
  endDate: PropTypes.object.isRequired,
};
