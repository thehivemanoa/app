import React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CalendarHeader from './CalendarHeader';
import Days from './Days';
import Cells from './Cells';

export default class Calendar extends React.Component {
  render() {
    return (
        <Container>
          <Grid>
            <CalendarHeader month={this.props.month}
                            handlePreviousMonthClick={this.props.handlePreviousMonthClick}
                            handleNextMonthClick={this.props.handleNextMonthClick}/>
            <Days/>
          </Grid>
          <Cells month={this.props.month}
                 handleDayClick={this.props.handleDayClick}/>
        </Container>
    );
  }
}

Calendar.propTypes = {
  month: PropTypes.instanceOf(Date).isRequired(),
  handlePreviousMonthClick: PropTypes.func.isRequired,
  handleNextMonthClick: PropTypes.func.isRequired,
  handleDayClick: PropTypes.func.isRequired,
};
