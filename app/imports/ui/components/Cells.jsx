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
        const currentDay = dateFns.addDays(startOfCurrentWeek, i);
        days.push(
            <Cell key={currentDay}
                  date={currentDay}
                  handleDayClick={() => this.props.handleDayClick(currentDay)} />,
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
  handleDayClick: PropTypes.func.isRequired,
  month: PropTypes.object.isRequired,
};
