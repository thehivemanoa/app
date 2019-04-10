import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import { Divider, List, Card } from 'semantic-ui-react';
import SessionCardWithDate from './SessionCardWithDate';
import SessionCard from './SessionCard';

const _ = require('underscore');

export default class SearchResults extends React.Component {
  render() {
    const courses = _.groupBy(this.props.sessions, 'course');
    let groups = _.mapObject(courses, function (sessions, course) {
      const sessionCards = _.map(sessions, (session, index) => <SessionCardWithDate key={index}
                                                                                    session={session}/>);
      return (
          <List.Item style={{ width: '100%' }} key={course}>
            <Divider horizontal>{course}</Divider>
            <Card.Group key={course} fluid>
              {sessionCards}
            </Card.Group>
          </List.Item>
      );
    });
    groups = _.values(groups)

    return (
      <List>
        {groups}
      </List>
    );
  }
}

SearchResults.propTypes = {
  sessions: PropTypes.array.isRequired,
};
