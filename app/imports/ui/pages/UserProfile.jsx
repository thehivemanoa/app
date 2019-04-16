import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Grid, Card, Image, Icon, Progress, Button, List } from 'semantic-ui-react';
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

    const center = {
      position: 'absolute',
      left: '.8em',
      bottom: '.6em',
      width: '100%',
      textAlign: 'center',
      fontSize: '1em',
    };

    const xpIcon = {
      fontSize: '3em',
      width: '100%',
      height: '0',
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
          <Card style={{ float: 'left', marginRight: '3em' }}>
            <Card.Content>
              <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' circular
                     style={{ marginBottom: 5 }}/>
              <div className="non-semantic-protector">
                <h1 className="ribbon">
                  <strong className="ribbon-content">{this.props.profiles.firstName}</strong>
                </h1>
                <Grid columns={2} verticalAlign='middle'>
                  <Grid.Column width={3}>
                    {/** Honey pot with level */}
                    <div style={{ position: 'relative' }}>
                      <Icon name="star outline" style={xpIcon}/>
                      <div style={center}>
                        <h2 style={{ fontSize: 18 }}>12</h2>
                      </div>
                    </div>
                  </Grid.Column>
                  <Grid.Column width={13}>
                    <Grid.Row>
                      {/** current/total XP */}
                      <p>800/1000 XP</p>
                    </Grid.Row>
                    <Grid.Row>
                      {/** Progress Bar*/}
                      <Progress value='4' total='5' progress='percent'/>
                    </Grid.Row>
                  </Grid.Column>
                </Grid>
              </div>
            </Card.Content>
          </Card>
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
                  <Button size='small' floated='left' content='Change Password' style={[smallButton, { marginLeft: 0 }]}/>
                </List.Item>
                <List.Item>
                  {/** Terminate account button + warning icon -> modal */}
                  <Button floated='left' size='small' content='Terminate Account' style={[smallButton, { marginLeft: 0 }]}/>
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
  profiles: PropTypes.array.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
/** export default withTracker(() => {
            // Get access to Profile documents.
            const subscription = Meteor.subscribe('Profiles');
            return {
              stuffs: Stuffs.find({}).fetch(),
              ready: subscription.ready(),
            };

            // Get access to Profile documents.

          })(UserProfile); */


export default withTracker(() => {
  const subscription = Meteor.subscribe('Profiles');
  return {
    profiles: Profiles.find({ owner: Meteor.user() }).fetch(),
    ready: subscription.ready(),
  };
})(UserProfile);
