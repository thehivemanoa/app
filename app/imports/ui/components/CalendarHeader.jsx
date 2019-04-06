import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import { Grid, Button, Icon, Header } from 'semantic-ui-react';

export default class CalendarHeader extends React.Component {
  render() {
    const change_month_container = {
      position: 'relative',
    };

    const change_month = {
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%, 0)',
      margin: '0',
    };

    const month_header = {
      textAlign: 'center',
    };

    return (
        <Grid.Row columns={3} centered>
          <Grid.Column>
            <Grid>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column width={1} style={change_month_container}>
                <Button onClick={this.props.handlePreviousMonthClick} style={change_month}>
                  <Icon name="chevron left"/>
                </Button>
              </Grid.Column>
            </Grid>
          </Grid.Column>

          <Grid.Column>
            <Header as="h1" style={month_header}>{dateFns.format(this.props.month, 'MMMM')}</Header>
          </Grid.Column>

          <Grid.Column>
            <Grid>
              <Grid.Column width={12}></Grid.Column>
              <Grid.Column width={1} style={change_month_container}>
                <Button onClick={this.props.handleNextMonthClick} style={change_month}>
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
  month: PropTypes.object.isRequired,
  handlePreviousMonthClick: PropTypes.func.isRequired,
  handleNextMonthClick: PropTypes.func.isRequired,
};
