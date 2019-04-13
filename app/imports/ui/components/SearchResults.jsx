import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import { Divider, List, Card } from 'semantic-ui-react';
import SessionCardFlat from './SessionCardFlat';

const _ = require('underscore');

export default class SearchResults extends React.Component {
  render() {
    const n = this.props.sessions.length;
    let sessionCards = _.map(this.props.sessions,
        (session, index) => {
          return <SessionCardFlat key={index}
                                  index={n - index}
                                  session={session}/>;
        });
    sessionCards = _.flatten(sessionCards);

    return (
        <List>
          {sessionCards}
        </List>
    );
  }
}

SearchResults.propTypes = {
  sessions: PropTypes.array.isRequired,
};
