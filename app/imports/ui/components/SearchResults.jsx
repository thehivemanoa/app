import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import { Divider, List, Card } from 'semantic-ui-react';
import SessionCardFlat from './SessionCardFlat';

const _ = require('underscore');

export default class SearchResults extends React.Component {
  render() {
    const sessionCards = _.map(this.props.sessions, (session, index) => <SessionCardFlat key={index}
                                                                              session={session}/>);

    return (
      <Card.Group>
        {sessionCards}
      </Card.Group>
    );
  }
}

SearchResults.propTypes = {
  sessions: PropTypes.array.isRequired,
};
