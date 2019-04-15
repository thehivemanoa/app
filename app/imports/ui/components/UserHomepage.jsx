import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Container, Divider, Button } from 'semantic-ui-react';
import { Sessions } from '/imports/api/session/session';
import SessionCard from '/imports/ui/components/SessionCard';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Session documents. Use <SessionCard> to render each row. */
class UserHomepage extends React.Component {

  render() {

    const containerPadding = {
      paddingTop: 20,
      paddingBottom: 20,
    }

    return (
        <Container className="user-homepage" style={containerPadding}>
          {/** 2 column grid */}
          <Grid columns={2} divided>
            <Grid.Column width={12}>
              { /** *** UPCOMING SESSIONS **** */}
              <Grid columns='equal' verticalAlign='middle'>
                <Grid.Column>
                  <Divider horizontal><h2> Upcoming Sessions </h2></Divider>
                </Grid.Column>
                <Grid.Column width={4} floated='right'>
                  <Button size="tiny" floated="right" content="Schedule New Session"/>
                </Grid.Column>
              </Grid>
              <Grid.Row>
                <Divider horizontal><h2> Monday, April 9 </h2></Divider>
                <h2> Session Cards </h2>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={4}>
              {/** *** MY COURSES **** */}
              <Divider horizontal><h2> My Courses </h2></Divider>
              <h2> Course Cards </h2>
              <h2> Add Course Button </h2>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

export default (UserHomepage);
