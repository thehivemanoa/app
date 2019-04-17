import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Grid, Card, Button, List } from 'semantic-ui-react'
import ProfileCard from '../components/ProfileCard';
import { Profiles } from '/imports/api/profiles/profiles';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    const containerPadding = {
      paddingTop: 20,
      paddingBottom: 30,
      paddingLeft: 50,
      paddingRight: 50,
      minHeight: '70vh',
    };

    const smallButton = {
      float: 'right',
      marginLeft: '2em',
      paddingTop: 0,
      paddingBottom: 0,
      height: '2em'
    };

    return (
        <Container className="profile-page" style={containerPadding}>

          { /** *** PROFILE CARD **** */}
          <ProfileCard/>

          <Grid divided='vertically'>
            {/** column 2 = 2 rows = My Courses and Account Information */}
            {/** scroll bar? */}
            <Grid.Row>
              {/** *** MY COURSES **** */}
              <h2>MY COURSES<Button size='small' content='edit' style={smallButton}/></h2>
              {/** course cards = colored course number, bee status, edit pop modal */}
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
              {/** add course button --> popup modal */}
              <Button content='Add Course' style={{ marginTop: '1em' }}/>
            </Grid.Row>
            <Grid.Row>
              {/** *** ACCOUNT INFORMATION **** */}
              <h2>ACCOUNT INFORMATION <Button size='mini' content='edit' floated='right' style={smallButton}/></h2>
            </Grid.Row>
            <Grid.Row>
              <List>
                <List.Item>First Name: John</List.Item>
                <List.Item>Last Name: Smith</List.Item>
                <List.Item>Email: johnsmith@email.com</List.Item>
                <List.Item>
                  {/** Change Password button -> modal */}
                  <Button size='small' floated='left' content='Change Password'
                          style={[smallButton, { marginLeft: 0 }]}/>
                </List.Item>
                <List.Item>
                  {/** Terminate account button + warning icon -> modal */}
                  <Button floated='left' size='small' content='Terminate Account'
                          style={[smallButton, { marginLeft: 0 }]}/>
                </List.Item>
              </List>
            </Grid.Row>
          </Grid>
        </Container>
    )
        ;
  }
}

/** Require an array of Stuff documents in the props. */
UserProfile.propTypes = {
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Profiles');
  return {
    profiles: Profiles.find({}).fetch(),
    ready: subscription.ready(),
  };
})(UserProfile);
