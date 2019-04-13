import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import { Button, Header, Grid } from 'semantic-ui-react';
import TinyCalendar from './TinyCalendar';

export default class CalendarRangeSelector extends React.Component {
  render() {
    const buttonStyle = {
      height: '100%',
      width: '100%',
      padding: 0,
    };
    const calendarContainerStyle = {
      padding: 0,
      height: '110px',
    };
    const buttonContainerStyle = {
      padding: 0,
    };

    return (
        <Grid container>
          <Grid.Row style={{ display: 'inline-block' }}>
            <Header as="h4" textAlign="center">{dateFns.format(this.props.month, 'MMMM')}</Header>
          </Grid.Row>
          <Grid.Row style={calendarContainerStyle}>
            <Grid.Column width={1} style={buttonContainerStyle}>
              <Button icon="chevron left" style={buttonStyle}/>
            </Grid.Column>
            <Grid.Column width={1} style={buttonContainerStyle}>
              <Button style={buttonStyle}>{'\u221E'}</Button>
            </Grid.Column>
            <Grid.Column width={12} style={{ paddingRight: '13px', paddingLeft: '13px', paddingBottom: '13px', paddingTop: '13px' }}>
              <TinyCalendar month={this.props.month}
                            isInRange={this.props.isInRange}
                            endDate={this.props.endDate}
                            startDate={this.props.startDate}
                            setFromDate={this.props.setFromDate}
                            setToDate={this.props.setToDate}/>
            </Grid.Column>
            <Grid.Column width={1} style={buttonContainerStyle}>
              <Button style={buttonStyle}>{'\u221E'}</Button>
            </Grid.Column>
            <Grid.Column width={1} style={buttonContainerStyle}>
              <Button icon="chevron right" style={buttonStyle}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

CalendarRangeSelector.propTypes = {
  month: PropTypes.object.isRequired,
  isInRange: PropTypes.func.isRequired,
  setToDate: PropTypes.func.isRequired,
  setFromDate: PropTypes.func.isRequired,
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired,
};
