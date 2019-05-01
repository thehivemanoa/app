import React from 'react';
import PropTypes from 'prop-types';
import { Container, Table, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/profile';
import LeaderboardItem from '../components/LeaderboardItem';

const _ = require('underscore');

/** Renders the Page for adding a document. */
class Leaderboard extends React.Component {

  render() {
    return (this.props.ready) ? this.renderComponent() :
        <Container className="page-container">
          <Loader active>Getting data</Loader>
        </Container>;
  }

  renderComponent() {
    console.log(this.props.profiles);
    return (
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Accumulated Exp</Table.HeaderCell>
              <Table.HeaderCell>Level</Table.HeaderCell>
              <Table.HeaderCell>Rank</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.profiles.map((data, index) => <LeaderboardItem key={index}
                                                                       profile={data}
                                                                       rank={index}/>)}
          </Table.Body>
        </Table>
    );
  }
}

Leaderboard.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Profile documents.
  const profileSub = Meteor.subscribe('Profiles');

  return {
    profiles: Profiles.find({}, { sort: { exp: -1 } }).fetch(),
    ready: (
        profileSub.ready()
    ),
  };
})(Leaderboard);
