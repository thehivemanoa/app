import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Grid, Divider, Card, Image, Icon, Progress } from 'semantic-ui-react';
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
    }

    const center = {
      position: 'absolute',
      left: '.8em',
      bottom: '.6em',
      width: '100%',
      textAlign: 'center',
      fontSize: '1em',
    }

    const xpIcon = {
      fontSize: '3em',
      width: '100%',
      height: '0',
    }

    return (
        <Container className="profile-page" style={containerPadding}>

          {/** 2 column grid */}
          <Grid columns={2} divided>
            <Grid.Column>
              { /** *** PROFILE CARD **** */}
              <Card>
                <Card.Content>
                  <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' circular
                         style={{ marginBottom: 5 }}/>
                  <div className="non-semantic-protector">
                    <h1 className="ribbon">
                      <strong className="ribbon-content">John Smith</strong>
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
            </Grid.Column>
            <Grid.Column>
              {/** column 2 = 2 rows = My Courses and Account Information */}
              {/** scroll bar? */}
              <Grid.Row>
                {/** *** MY COURSES **** */}
                <Divider><h2>MY COURSES</h2></Divider>
                {/** course cards = colored course number, bee status, edit pop modal */}
                {/** add course button --> popup modal */}
              </Grid.Row>
              <Grid.Row>
                {/** *** ACCOUNT INFORMATION **** */}
                <Divider><h2>ACCOUNT INFORMATION</h2></Divider>
                {/** Name: [user's name], edit button->modal */}
                {/** Email Address: [user's email], edit button->modal */}
                {/** Change Password button -> modal */}
                {/** Terminate account button + warning icon -> modal */}
              </Grid.Row>
            </Grid.Column>
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
          profiles: Profiles.find({}).fetch(),
          ready: subscription.ready(),
        };
        })(UserProfile);
