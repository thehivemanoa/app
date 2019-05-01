import React from 'react';
import PropTypes from 'prop-types';
import { Table, Image, Header } from 'semantic-ui-react';

const _ = require('underscore');

/** Renders the Page for adding a document. */
class LeaderboardItem extends React.Component {

  render() {
    console.log(this.props.profile.rank);
    return (
        <Table.Row>
          <Table.Cell>
            <Header as = 'h4' image>
            <Image src = {this.props.profile.image} avatar size='mini' />
            <Header.Content>
              {this.props.profile.firstName} {this.props.profile.lastName}
            </Header.Content>
          </Header>
          </Table.Cell>
          <Table.Cell>{this.props.profile.exp}</Table.Cell>
          <Table.Cell>{this.props.profile.level}</Table.Cell>
          <Table.Cell>{this.props.profile.rank}</Table.Cell>
        </Table.Row>
    );
  }
}

LeaderboardItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default LeaderboardItem;
