import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Feed, Card, Container, Loader } from 'semantic-ui-react';
import DataCard from '../components/DataCard';
import ReportItem from '../components/ReportItem';
import ActivityItem from '../components/ActivityItem';
import TaskItem from '../components/TaskItem';
import { Profiles } from '../../api/profile/profile';
import { Sessions } from '../../api/session/session';
import { ReportLog } from '../../api/reportLog/reportLog';
import { ActivityLog } from '../../api/activityLog/activityLog';
import { TaskList } from '../../api/taskList/taskList';

// import AddCourse from '../components/AddCourse';

/**
 * Data card x4
 * ReportFeed | TaskList
 * ActivityFeed
 */

class Admin extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() :
        <Container className="page-container">
          <Loader active>Getting data</Loader>
        </Container>;
  }

  renderPage() {
    return (
        <div className="page-container">
          <Grid container>
            {/** --------------------------------- ROW 1---------------------------------*/}
            <Grid.Row centered columns={4}>
              <Grid.Column>
                <Card fluid style={{ padding: '10px' }}>
                  <DataCard icon={'users'} value={this.props.profiles.length} text={'Accounts'}/>
                </Card>
              </Grid.Column>

              <Grid.Column>
                <Card fluid style={{ padding: '10px' }}>
                  <DataCard icon={'envelope'} value={2} text={'Received Feedback'}/>
                </Card>
              </Grid.Column>

              <Grid.Column>
                <Card fluid style={{ padding: '10px' }}>
                  <DataCard icon={'tag'} value={this.props.sessions.length} text={'Sessions Created'}/>
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
                <Card fluid>
                  <Card.Content>
                    <Card.Header>Task List</Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <Feed>
                      {this.props.taskList.map((data, index) => <TaskItem key={index}
                                                                          taskItem={data}/>)}
                    </Feed>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>

            {/** --------------------------------- ROW 3---------------------------------*/}
            <Grid.Row centered style={{ marginBottom: '14px' }}>
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
        </div>
    );
  }
}

Admin.propTypes = {
  profiles: PropTypes.array.isRequired,
  sessions: PropTypes.array.isRequired,
  reports: PropTypes.array.isRequired,
  activityLog: PropTypes.array.isRequired,
  taskList: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const profileSub = Meteor.subscribe('Profiles');
  const sessionsSub = Meteor.subscribe('Sessions');
  const activitySub = Meteor.subscribe('ActivityLog');
  const reportLogSub = Meteor.subscribe('ReportLog');
  const taskSub = Meteor.subscribe('TaskList');
  return {
    profiles: Profiles.find({}).fetch(),
    sessions: Sessions.find({}).fetch(),
    reports: ReportLog.find({}).fetch(),
    activityLog: ActivityLog.find({}).fetch(),
    taskList: TaskList.find({}).fetch(),
    ready: (
        profileSub.ready() &&
        sessionsSub.ready() &&
        reportLogSub.ready() &&
        activitySub.ready() &&
        taskSub.ready()
    ),
  };
})(Admin);
