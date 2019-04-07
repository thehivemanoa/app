import React from 'react';
import dateFns from 'date-fns';
import { Meteor } from 'meteor/meteor';
import { Grid, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Sessions } from '../../api/session/session';
import Calendar from '../components/Calendar';
import SessionList from '../components/SessionList';

class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    const initialDate = new Date();
    this.state = {
      selectedDate: initialDate,
      month: dateFns.startOfMonth(initialDate),
    };
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handlePreviousMonthClick = this.handlePreviousMonthClick.bind(this);
    this.handleNextMonthClick = this.handleNextMonthClick.bind(this);
    this.handlePreviousDayClick = this.handlePreviousDayClick.bind(this);
    this.handleNextDayClick = this.handleNextDayClick.bind(this);
  }

  handleDayClick(date) {
    this.setState({
      selectedDate: date,
    });
  }

  handlePreviousMonthClick() {
    this.setState({
      month: dateFns.addMonths(this.state.month, -1),
    });
  }

  handleNextMonthClick() {
    this.setState({
      month: dateFns.addMonths(this.state.month, 1),
    });
  }

  handlePreviousDayClick() {
    const previousDay = dateFns.addDays(this.state.selectedDate, -1);
    this.setState({
      selectedDate: previousDay,
      month: dateFns.startOfMonth(previousDay),
    });
  }

  handleNextDayClick() {
    const nextDay = dateFns.addDays(this.state.selectedDate, 1);
    this.setState({
      selectedDate: nextDay,
      month: dateFns.startOfMonth(nextDay),
    });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const middleGridStyle = {
      minWidth: '1200px',
    };
    return (
        <div>
          <Grid style={middleGridStyle} centered container>
            <Grid.Column width={11}>
              <Calendar selectedDate={this.state.selectedDate}
                        sessions={this.props.sessions}
                        month={this.state.month}
                        handlePreviousMonthClick={this.handlePreviousMonthClick}
                        handleNextMonthClick={this.handleNextMonthClick}
                        handleDayClick={this.handleDayClick}/>
            </Grid.Column>
            <Grid.Column width={5}>
              <SessionList handleNextDayClick={this.handleNextDayClick}
                           sessions={this.props.sessions.filter(session => dateFns.isSameDay(
                               session.startTime,
                               this.state.selectedDate,
                           ))}
                           handlePreviousDayClick={this.handlePreviousDayClick}
                           selectedDate={this.state.selectedDate}/>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

CalendarPage.propTypes = {
  sessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Sessions');
  return {
    sessions: Sessions.find({}).fetch(),
    ready: subscription.ready(),
  };
})(CalendarPage);
