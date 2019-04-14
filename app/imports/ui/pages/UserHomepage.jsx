import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Loader, Divider } from 'semantic-ui-react';
import { Sessions } from '/imports/api/session/session';
import SessionCard from '/imports/ui/components/SessionCard';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Session documents. Use <SessionCard> to render each row. */
class UserHomepage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className="user-homepage">

          {/** 2 column grid */}
          <Grid columns={3} divided>
            <Grid.Column width={2}>
              { /** *** UPCOMING SESSIONS **** */}
              <Grid.Row columns={2}>
                <Grid.Column>
              <Divider><h2>MY COURSES</h2></Divider>
                </Grid.Column>
                <Grid.Column>
                  <h2>Schedule new session button</h2>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column>
                {/** *** MY COURSES **** */}
                <Divider><h2> Monday, April 9 </h2></Divider>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

/** Require an array of Session documents in the props. */
UserHomepage.propTypes = {
  sessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Session documents.
  const subscription = Meteor.subscribe('Session');
  return {
    sessions: Sessions.find({}).fetch(),
    ready: subscription.ready(),
  };
})(UserHomepage);
