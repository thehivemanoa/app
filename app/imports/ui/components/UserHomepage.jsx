import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Container, Divider, Button, Card, Image, Header, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';
import { Sessions } from '../../api/session/session';
import UpcomingSessionList from '/imports/ui/components/UpcomingSessionList';

/** Renders a table containing all of the Session documents. Use <SessionCard> to render each row. */
class UserHomepage extends React.Component {

  constructor(props) {
    super(props);
    this.currentDate = new Date();
    this.handleLeave = this.handleLeave.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.isJoined = this.isJoined.bind(this);
  }

  handleLeave(sessionId) {
    const currentUserId = this.props.currentUserId;
    const throwError = function (error) {
      return error ? Bert.alert({ type: 'danger', message: `Leave failed: ${error.message}` }) :
          Bert.alert({ type: 'success', message: 'Leave succeeded' });
    };
    Meteor.users.update(
        currentUserId,
        { $pull: { 'profile.joinedSessions': sessionId } },
        error => throwError(error),
    );
    Sessions.update(
        sessionId,
        { $pull: { attendees: this.props.currentUsername } },
        error => throwError(error),
    );
  }

  handleJoin(sessionId) {
    const currentUserId = this.props.currentUserId;
    const throwError = function (error) {
      return error ? Bert.alert({ type: 'danger', message: `Join failed: ${error.message}` }) :
          Bert.alert({ type: 'success', message: 'Join succeeded' });
    };
    Meteor.users.update(
        currentUserId,
        { $push: { 'profile.joinedSessions': sessionId } },
        error => throwError(error),
    );
    Sessions.update(
        sessionId,
        { $push: { attendees: this.props.currentUsername } },
        error => throwError(error),
    );
  }

  isJoined(sessionId) {
    const joinedSessions = this.props.joinedSessions;
    return _.some(joinedSessions, session => session === sessionId);
  }

  render() {

    const containerPadding = {
      paddingTop: 20,
      paddingBottom: 70,
    }

    return (
        <Container className="user-homepage" style={containerPadding}>

          <Container textAlign='center' style={{ marginBottom: 50, padding: 20, backgroundColor: 'lightGrey' }}>
            <Header as='h2'>
              <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png'/> Welcome Back, John
              Smith!
            </Header>
          </Container>

          {/** 2 column grid */}
          <Grid columns={2} divided>
            <Grid.Column width={12}>
              { /** *** UPCOMING SESSIONS **** */}
                <Grid.Row>
                <h2> Upcoming Sessions</h2>
                </Grid.Row>
              <Grid.Row>
                {/** Session Cards */}
                <UpcomingSessionList
                    sessions={this.props.sessions}
                    selectedDate={this.currentDate}
                    handleLeave={this.handleLeave}
                    handleJoin={this.handleJoin}
                    isJoined={this.isJoined}
                />
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={4}>
              {/** *** MY COURSES **** */}
              <Divider horizontal><h2> My Courses </h2></Divider>

              {/** Course Cards */}
              <Card.Group>
                <Card>
                  <Card.Content>
                    <Card.Header>ICS 314</Card.Header>
                    <Card.Meta>Worker Bee</Card.Meta>
                  </Card.Content>
                </Card>
                <Card>
                  <Card.Content>
                    <Card.Header>ICS 311</Card.Header>
                    <Card.Meta>Royal Bee</Card.Meta>
                  </Card.Content>
                </Card>
              </Card.Group>
              <br/>
              <Button size='tiny' style={{ backgroundColor: '#4cba6f', color: 'white' }}>
                <Icon style={{ opacity: 1 }} name="plus"/>
                Add Courses
              </Button>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

UserHomepage.propTypes = {
  joinedSessions: PropTypes.array.isRequired,
  currentUsername: PropTypes.string.isRequired,
  currentUserId: PropTypes.string.isRequired,
  sessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('MySessions');
  return {
    currentUserId: Meteor.user() ? Meteor.user()._id : '',
    currentUsername: Meteor.user() ? Meteor.user().username : '',
    joinedSessions: Meteor.user() ? Meteor.user().profile.joinedSessions : [],
    sessions: Sessions.find({}).fetch(),
    ready: (subscription.ready()),
  };
})(UserHomepage);
