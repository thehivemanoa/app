import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import Cell from './Cell';


export default class Cells extends React.Component {
  render() {
    const weeks = [];
    const startOfFirstWeek = dateFns.startOfWeek(this.props.month);
    const startOfLastWeek = dateFns.startOfWeek(dateFns.endOfMonth(this.props.month));
    let startOfCurrentWeek = startOfFirstWeek;
    while (!dateFns.isAfter(startOfCurrentWeek, startOfLastWeek)) {
      const days = [];
      for (let i = 0; i < 7; i++) {
        const date = dateFns.addDays(startOfCurrentWeek, i);
        days.push(
            <Cell key={date}
                  date={date}
                  sessions={this.props.sessions.filter(session => dateFns.isSameDay(session.startTime, date))}
                  handleDayClick={() => this.props.handleDayClick(date)} />,
        );
      }
      weeks.push(
          <Grid.Row columns={7} key={startOfCurrentWeek}>
            {days}
          </Grid.Row>,
      );
      startOfCurrentWeek = dateFns.addWeeks(startOfCurrentWeek, 1);
    }

    return (
        <Grid celled>
          {weeks}
        </Grid>
    );
  }
}

Cells.propTypes = {
  sessions: PropTypes.array.isRequired,
  handleDayClick: PropTypes.func.isRequired,
  month: PropTypes.object.isRequired,
};
