import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Feed, Card } from 'semantic-ui-react';
import DataCard from '../components/DataCard';
import TaskList from '../components/TaskList';
import ReportItem from '../components/ReportItem';
import ActivityItem from '../components/ActivityItem';
import { Courses } from '../../api/courses/courses';
import { Sessions } from '../../api/session/session';
import { ReportLog } from '../../api/reportLog/reportLog';
import { ActivityLog } from '../../api/activityLog/activityLog';

// import AddCourse from '../components/AddCourse';

/**
 * Data card x4
 * ReportFeed | TaskList
 * ActivityFeed
 */

class Admin extends React.Component {
  render() {
    return (
        <Grid container>
          {/** --------------------------------- ROW 1---------------------------------*/}
          <Grid.Row centered columns={4}>
            <Grid.Column>
              <Card fluid style={{ padding: '10px' }}>
                <DataCard icon={'coffee'} value={999} text={'Coffees drank'}/>
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

          {/** --------------------------------- ROW 2---------------------------------*/}
          <Grid.Row centered columns={2}>
            {/** Might need to add overflow: scroll to css for this component to allow list to be scrolled */}
            <Grid.Column>
              <Card fluid>
                <Card.Content>
                  <Card.Header>Active Reports</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Feed>
                    {this.props.reports.map((data, index) => <ReportItem key={index}
                                                                         reportItem={data}/>)}
                  </Feed>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column>
              <TaskList/>
            </Grid.Column>
          </Grid.Row>

          {/** --------------------------------- ROW 3---------------------------------*/}
          <Grid.Row centered>
            <Grid.Column>
              <Card fluid>
                <Card.Content>
                  <Card.Header>Admin Activity Report</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Feed>
                    {this.props.activityLog.map((data, index) => <ActivityItem key={index}
                                                                                       activityItem={data}/>)}
                  </Feed>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

Admin.propTypes = {
  courses: PropTypes.array.isRequired,
  sessions: PropTypes.array.isRequired,
  reports: PropTypes.array.isRequired,
  activityLog: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const courseSub = Meteor.subscribe('Accounts');
  const sessionsSub = Meteor.subscribe('Sessions');
  const activitySub = Meteor.subscribe('ActivityLog');
  const reportLogSub = Meteor.subscribe('ReportLog');
  return {
    courses: Courses.find({}).fetch(),
    sessions: Sessions.find({}).fetch(),
    reports: ReportLog.find({}).fetch(),
    activityLog: ActivityLog.find({}).fetch(),
    ready: (courseSub.ready() && sessionsSub.ready() && reportLogSub.ready() && activitySub.ready()),
  };
})(Admin);
