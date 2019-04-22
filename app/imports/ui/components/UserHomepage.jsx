import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Container, Divider, Button, Card, Image, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Sessions } from '/imports/api/session/session';
import SessionCard from '/imports/ui/components/SessionCard';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Session documents. Use <SessionCard> to render each row. */
class UserHomepage extends React.Component {

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
              <Grid columns='equal' verticalAlign='middle'>
                  <h2> Upcoming Sessions </h2>
              </Grid>
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

export default (UserHomepage);
