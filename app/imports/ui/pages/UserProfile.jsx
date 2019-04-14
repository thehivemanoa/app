import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Grid, Divider } from 'semantic-ui-react';
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
    return (
        <div className="profile-page">

          {/** 2 column grid */}
          <Grid columns={2} divided>
            <Grid.Column>
              { /** *** PROFILE CARD **** */}
              {/** profile picture (popup edit pfp modal) */}
              {/** Banner with user name */}
              {/** Honey pot with level */}
              {/** current/total XP */}
              {/** Progress Bar */}
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
        </div>
    );
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
