import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import { List, Header } from 'semantic-ui-react';
import SessionCardFlat from './SessionCardFlat';

const _ = require('underscore');

export default class SearchResults extends React.Component {
  render() {
    const n = this.props.sessions.length;

    let sessionCards = _.map(this.props.sessions,
        (session, index) => {
          const isJoined = this.props.isJoined(session._id);
          const updateJoined = isJoined ? this.props.handleLeave : this.props.handleJoin;
          return <SessionCardFlat key={index}
                                  index={n - index}
                                  session={session}
                                  updateJoined={() => updateJoined(session._id)}
                                  isJoined={isJoined}/>;
        });
    sessionCards = _.flatten(sessionCards);

    return (
        <div style={{ textAlign: 'center' }}>
          <Header
              as="h3"
              style={{
                margin: 0,
                display: this.props.sessions.length === 0 ? 'inline-block' : 'inline-block',
                lineHeight: '65px',
              }}
          >
            {this.props.sessions.length === 0 ? 'No Results' : 'Results'}
          </Header>
          <List style={{ margin: 0 }}>
            {sessionCards}
          </List>
        </div>
    );
  }
}

SearchResults.propTypes = {
  sessions: PropTypes.array.isRequired,
  handleJoin: PropTypes.func.isRequired,
  isJoined: PropTypes.func.isRequired,
  handleLeave: PropTypes.func.isRequired,
};
