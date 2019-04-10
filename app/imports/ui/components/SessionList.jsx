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
    const courses = _.groupBy(this.props.sessions, 'course');
    let groups = _.mapObject(courses, function (sessions, course) {
      const sessionCards = _.map(sessions, (session, index) => <SessionCard key={index} session={session} fluid/>);
      return (
          <div style={{ width: '100%' }}>
            <Divider horizontal>{course}</Divider>
            <Card.Group key={course} fluid>
              {sessionCards}
            </Card.Group>
          </div>
      );
    });
    groups = _.values(groups);
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
          <Card.Content style={{ paddingTop: 0 }}>
            {groups}
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
