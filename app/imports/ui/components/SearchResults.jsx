import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import { List, Divider } from 'semantic-ui-react';
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
        <div style={{ marginTop: '8px' }}>
          <Divider horizontal>{`${this.props.sessions.length} results`}</Divider>
          <List style={{ marginTop: '20px' }}>
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
