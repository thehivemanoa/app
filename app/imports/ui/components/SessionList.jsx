import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import { Card, Header, Grid, Button, Icon, Divider } from 'semantic-ui-react';
import SessionCard from './SessionCard';

const _ = require('underscore');

export default class SessionList extends React.Component {
  render() {
    const date = this.props.selectedDate;
    const dayOfTheWeek = dateFns.format(date, 'dddd');
    const month = dateFns.format(date, 'MMM');
    const dayOfTheMonth = dateFns.format(date, 'DD');
    const formattedDate = `${dayOfTheWeek}, ${month} ${dayOfTheMonth} `;
    const sessionCards = _.map(_.sortBy(this.props.sessions, 'startTime'), (session) => {
      const isJoined = this.props.isJoined(session._id);
      const handleUpdate = isJoined ? this.props.handleLeave : this.props.handleJoin;
      return (
          <SessionCard
              key={session.startTime}
              session={session}
              handleUpdate={() => handleUpdate(session._id)}
              isJoined={isJoined}
              isFluid={true}
          />
      );
    });
    // const events = this.props.sessions.map((session, index) => <SessionCard key={index} session={session} />);

    return (
        <Card className="session_list" fluid>
          <Card.Content>
            <Card.Header>
              <Grid columns="equal">
                <Grid.Column>
                  <Button onClick={this.props.handlePreviousDayClick} style={{ backgroundColor: 'Transparent' }}>
                    <Icon name="chevron left"/>
                  </Button>
                </Grid.Column>

                <Grid.Column width={8} verticalAlign="middle">
                  <Header as="h4" textAlign="center">{formattedDate}</Header>
                </Grid.Column>

                <Grid.Column>
                  <Button onClick={this.props.handleNextDayClick} style={{ backgroundColor: 'Transparent' }}
                          floated="right">
                    <Icon name="chevron right"/>
                  </Button>
                </Grid.Column>
              </Grid>
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <Card.Group>
              {sessionCards}
            </Card.Group>
          </Card.Content>
        </Card>
    );
  }
}

SessionList.propTypes = {
  isJoined: PropTypes.func.isRequired,
  handleJoin: PropTypes.func.isRequired,
  handleLeave: PropTypes.func.isRequired,
  sessions: PropTypes.array.isRequired,
  selectedDate: PropTypes.object.isRequired,
  handlePreviousDayClick: PropTypes.func.isRequired,
  handleNextDayClick: PropTypes.func.isRequired,
};
