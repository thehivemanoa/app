import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import { Button, Header, Grid } from 'semantic-ui-react';
import TinyCalendar from './TinyCalendar';

export default class CalendarRangeSelector extends React.Component {
  render() {
    const minDate = new Date(-8640000000000000);
    const maxDate = new Date(8640000000000000);
    const buttonStyle = {
      height: '100%',
      width: '100%',
      padding: 0,
      borderRadius: 0,
    };
    const calendarContainerStyle = {
      padding: 0,
    };
    const buttonContainerStyle = {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: '1px',
      paddingRight: '1px',
    };

    return (
        <Grid container>
          <Grid.Row style={{ display: 'inline-block', paddingBottom: '2px' }}>
            <Header as="h4" textAlign="center" style={{ backgroundColor: '#E0E1E2' }}>{dateFns.format(this.props.month, 'MMMM')}</Header>
          </Grid.Row>
          <Grid.Row style={calendarContainerStyle}>
            <Grid.Column width={1} style={buttonContainerStyle}>
              <Button icon="chevron left"
                      style={buttonStyle}
                      onMouseEnter={this.props.pressPreviousMonth}
                      onMouseLeave={this.props.mouseLeaveChangeMonth}
                      onMouseUp={this.props.mouseUpChangeMonth}
                      onClick={() => this.props.changeMonth(-1)}/>
            </Grid.Column>
            <Grid.Column width={1} style={buttonContainerStyle}>
              <Button style={buttonStyle}
                      onMouseDown={() => this.props.setFromDate(minDate)}
                      onMouseEnter={() => this.props.setToDate(minDate)}
                      fluid>
                {'-\u221E'}
              </Button>
            </Grid.Column>
            <Grid.Column width={12} style={{ padding: '13px' }}>
              <TinyCalendar month={this.props.month}
                            isInRange={this.props.isInRange}
                            endDate={this.props.endDate}
                            startDate={this.props.startDate}
                            setFromDate={this.props.setFromDate}
                            setToDate={this.props.setToDate}/>
            </Grid.Column>
            <Grid.Column width={1} style={buttonContainerStyle}>
              <Button style={buttonStyle}
                      onMouseDown={() => this.props.setFromDate(maxDate)}
                      onMouseEnter={() => this.props.setToDate(maxDate)}
                      fluid>
                {'\u221E'}
              </Button>
            </Grid.Column>
            <Grid.Column width={1} style={buttonContainerStyle}>
              <Button icon="chevron right"
                      style={buttonStyle}
                      onMouseEnter={this.props.pressNextMonth}
                      onMouseLeave={this.props.mouseLeaveChangeMonth}
                      onMouseUp={this.props.mouseUpChangeMonth}
                      onClick={() => this.props.changeMonth(1)}/>
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
  pressPreviousMonth: PropTypes.func.isRequired,
  pressNextMonth: PropTypes.func.isRequired,
  mouseUpChangeMonth: PropTypes.func.isRequired,
  mouseLeaveChangeMonth: PropTypes.func.isRequired,
  changeMonth: PropTypes.func.isRequired,
};
