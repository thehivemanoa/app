import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/stuff';
import StuffItem from '/imports/ui/components/StuffItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListStuff extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className="profile-page">

          <!-- 2 column grid -->
          <!-- column 1 = profile card-->
          <!-- **** PROFILE CARD **** -->
          <!--  profile picture (popup edit pfp modal) -->
          <!--  Banner with user name -->
          <!--  Honey pot with level -->
          <!--  current/total XP -->
          <!--  Progress Bar-->

          <!--  column 2 = 2 rows = My Courses and Account Information -->
          <!--  scroll bar? -->
          <!-- **** MY COURSES **** -->
          <!--  Header -->
          <!--  thick divider line -->
          <!--  course cards = colored course number, bee status, edit pop modal -->
          <!--  add course button --> popup modal -->

          <!-- **** ACCOUNT INFORMATION **** -->
          <!--  Header -->
          <!--  thick divider line -->
          <!--  Name: [user's name], edit button->modal -->
          <!--  Email Address: [user's email], edit button->modal -->
          <!--  Change Password button -> modal -->
          <!--  Terminate account button + warning icon -> modal -->
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListStuff.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListStuff);
