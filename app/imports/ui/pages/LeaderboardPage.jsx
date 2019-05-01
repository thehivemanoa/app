import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/profile';

class LeaderboardPage extends React.Component {
  render() {
    return (
        <div className={'page-container'}>
          <Container>
            <Header content={'Hi I\'m the leaderboard page'}/>
          </Container>
        </div>
    );
  }
}

LeaderboardPage.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Profile documents.
  const profileSub = Meteor.subscribe('Profiles');

  return {
    profiles: Profiles.find({}).fetch(),
    ready: (
        profileSub.ready()
    ),
  };
})(LeaderboardPage);
