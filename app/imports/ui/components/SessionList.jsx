import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import { Card, Header, Grid, Button, Icon } from 'semantic-ui-react';
import SessionCard from './SessionCard';

export default class SessionList extends React.Component {
  render() {
    const date = this.props.selectedDate;
    const dayOfTheWeek = dateFns.format(date, 'dddd');
    const month = dateFns.format(date, 'MMM');
    const dayOfTheMonth = dateFns.format(date, 'DD');
    const formattedDate = `${dayOfTheWeek}, ${month} ${dayOfTheMonth} `;
    const events = this.props.sessions.map((session, index) => <SessionCard key={index} session={session} />);

    return (
        <Card className="session_list" fluid>
          <Card.Content>
            <Card.Header>
              <Grid columns="equal">
                <Grid.Column>
                  <Button onClick={this.props.handlePreviousDayClick}>
                      <Icon name="chevron left" />
                  </Button>
                </Grid.Column>

                <Grid.Column width={8} verticalAlign="middle">
                  <Header as="h4" textAlign="center">{formattedDate}</Header>
                </Grid.Column>

                <Grid.Column>
                  <Button onClick={this.props.handleNextDayClick} floated="right">
                    <Icon name="chevron right" />
                  </Button>
                </Grid.Column>
              </Grid>
            </Card.Header>
          </Card.Content>
          <Card.Content>
              <Card.Group>
                {events}
              </Card.Group>
          </Card.Content>
        </Card>
    );
  }
}

SessionList.propTypes = {
  sessions: PropTypes.array.isRequired,
  selectedDate: PropTypes.object.isRequired,
  handlePreviousDayClick: PropTypes.func.isRequired,
  handleNextDayClick: PropTypes.func.isRequired,
};
