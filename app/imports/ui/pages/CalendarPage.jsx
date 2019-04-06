import React from 'react';
import dateFns from 'date-fns';
import { Grid, Menu, Header } from 'semantic-ui-react';
import Calendar from '../components/Calendar';
import SessionList from '../components/SessionList';

export default class CalendarPage extends React.Component {
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
    return (
        <div>
          <Menu className="navbar" borderless>
            <Menu.Item>Waggle</Menu.Item>
          </Menu>

          <Grid className="middle_grid" centered container>
            <Grid.Column width={11}>
              <Calendar selectedDate={this.state.selectedDate}
                        month={this.state.month}
                        handlePreviousMonthClick={this.handlePreviousMonthClick}
                        handleNextMonthClick={this.handleNextMonthClick}
                        handleDayClick={this.handleDayClick}/>
            </Grid.Column>
            <Grid.Column width={5}>
              <SessionList handleNextDayClick={this.handleNextDayClick}
                           handlePreviousDayClick={this.handlePreviousDayClick}
                           selectedDate={this.state.selectedDate}/>
            </Grid.Column>
          </Grid>

          <div className="footer_background">
            <Header as="h1">Hello</Header>
          </div>
        </div>
    );
  }
}
