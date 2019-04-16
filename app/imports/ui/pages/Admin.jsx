import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Feed, Card } from 'semantic-ui-react';
import DataCard from '../components/DataCard';
import TaskList from '../components/TaskList';
import IssueFeed from '../components/IssueFeed';
import { Courses } from '../../api/courses/courses';
import { Sessions } from '../../api/session/session';
import AddCourse from '../components/AddCourse';

/**
 * Data card x4
 * ReportFeed | TaskList
 * ActivityFeed
 */

class Admin extends React.Component {
  render() {
    return (
        <Grid container>
          <Grid.Row centered columns={4}>
            <Grid.Column>
              <Card fluid style={{ padding: '10px' }}>
                <DataCard icon={'coffee'} value={9999} text={'Coffees drank'}/>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card fluid style={{ padding: '10px' }}>
                <DataCard icon={'envelope'} value={2} text={'Received Feedback'}/>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card fluid style={{ padding: '10px' }}>
                <DataCard icon={'tag'} value={3} text={'Completed Sessions'}/>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card fluid style={{ padding: '10px' }}>
                <DataCard icon={'comment'} value={4} text={'New Messages'}/>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered columns={2}>
            <Grid.Column>
              <Card fluid>
                <Card.Content>
                  <Card.Header>Recent Activity</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Feed>
                    <IssueFeed/>
                    <IssueFeed/>
                    <IssueFeed/>
                    <IssueFeed/>
                    <IssueFeed/>
                    <IssueFeed/>
                    <IssueFeed/>
                  </Feed>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <TaskList/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <AddCourse/>
          </Grid.Row>
        </Grid>
    );
  }
}

Admin.propTypes = {
  courses: PropTypes.array.isRequired,
  sessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const courseSub = Meteor.subscribe('Courses');
  const sessionsSub = Meteor.subscribe('Sessions');
  return {
    courses: Courses.find({}).fetch(),
    sessions: Sessions.find({}).fetch(),
    ready: (courseSub.ready() && sessionsSub.ready()),
  };
})(Admin);
