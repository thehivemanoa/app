import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import { List, Header } from 'semantic-ui-react';
import SessionCardFlat from './SessionCardFlat';

const _ = require('underscore');

export default class SearchResults extends React.Component {
  render() {
    return (
        <div style={{ textAlign: 'center' }}>
          <Header as="h1" style={{ display: this.props.sessionCards.length === 0 ? '' : 'none' }}>No Results</Header>
          <List style={{ margin: 0 }}>
            {this.props.sessionCards}
          </List>
        </div>
    );
  }
}

SearchResults.propTypes = {
  sortBy: PropTypes.string.isRequired,
  sessionCards: PropTypes.array.isRequired,
  handleJoin: PropTypes.func.isRequired,
  isJoined: PropTypes.func.isRequired,
  handleLeave: PropTypes.func.isRequired,
};
