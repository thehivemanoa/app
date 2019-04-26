import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Container, Divider, Button, Card, Image, Header, } from 'semantic-ui-react';
import { Sessions } from '/imports/api/session/session';
import { Profiles } from '/imports/api/profile/profile';
import SessionCard from '/imports/ui/components/SessionCard';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';

/** Renders a table containing all of the Session documents. Use <SessionCard> to render each row. */
class UserHomepage extends React.Component {

  render() {

    const containerPadding = {
      paddingTop: '160px',
      paddingBottom: '70px',
    };

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
              {/** *** COMPLETED SESSIONS **** */}
              <Grid.Row>
                <Grid columns='equal' verticalAlign='middle'>
                  <Grid.Column>
                    <Divider horizontal><h2> Completed Sessions </h2></Divider>
                  </Grid.Column>
                  <Grid.Column width={4} floated='right'>
                    <Button size="tiny" floated="right" as={NavLink} exact to="/collect">Collect Honey x2</Button>
                  </Grid.Column>
                </Grid>
              </Grid.Row>
              <Grid.Row>
                {/** Session Cards */}
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
              </Grid.Row>
              <Grid.Row>
                <Grid columns='equal' verticalAlign='middle'>
                  <Grid.Column>
                    <Divider horizontal><h2> Upcoming Sessions </h2></Divider>
                  </Grid.Column>
                  <Grid.Column width={4} floated='right'>
                    <Button size="tiny" floated="right" content="Schedule New Session"/>
                  </Grid.Column>
                </Grid>
              </Grid.Row>
              <Grid.Row>
                <Divider horizontal><h2> Monday, April 9 </h2></Divider>
                {/** Session Cards */}
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
              <Button content='Add Course'/>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

UserHomepage.propTypes = {
  currentUser: PropTypes.string,
  profile: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};


const UserHomepageContainer = withTracker(() => {
  const subscription = Meteor.subscribe('Profile');
  const subscription2 = Meteor.subscribe('Sessions');
  return {
    currentUser: Meteor.user() ? Meteor.user().username : '',
    profile: Profiles.find({}).fetch(),
    sessions: Sessions.find({}).fetch(),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(UserHomepage);

export default withRouter(UserHomepageContainer);
