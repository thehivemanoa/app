import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import { Grid, Button, Icon, Header } from 'semantic-ui-react';

export default class CalendarHeader extends React.Component {
  render() {
    return (
        <Grid.Row columns={3} centered>
          <Grid.Column>
            <Grid>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column width={1} className="change_month_container">
                <Button onClick={this.props.handlePreviousMonthClick} className="change_month">
                  <Icon name="chevron left"/>
                </Button>
              </Grid.Column>
            </Grid>
          </Grid.Column>

          <Grid.Column>
            <Header as="h1" className="month_header">{dateFns.format(this.props.month, 'MMMM')}</Header>
          </Grid.Column>

          <Grid.Column>
            <Grid>
              <Grid.Column width={13}></Grid.Column>
              <Grid.Column width={1} className="change_month_container">
                <Button onClick={this.props.handleNextMonthClick} className="change_month">
                  <Icon name="chevron right"/>
                </Button>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid.Row>
    );
  }
}

CalendarHeader.propTypes = {
  month: PropTypes.instanceOf(Date).isRequired(),
  handlePreviousMonthClick: PropTypes.func.isRequired,
  handleNextMonthClick: PropTypes.func.isRequired,
};
