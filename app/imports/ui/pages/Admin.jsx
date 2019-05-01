import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Feed, Card, Container, Loader, Segment, Header, Button, Modal } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import HiddenField from 'uniforms-semantic/HiddenField';
import { Bert } from 'meteor/themeteorchef:bert';
import DataCard from '../components/DataCard';
import ReportItem from '../components/ReportItem';
import ActivityItem from '../components/ActivityItem';
import TaskItem from '../components/TaskItem';
import { Profiles } from '../../api/profile/profile';
import { Sessions } from '../../api/session/session';
import { ReportLog } from '../../api/reportLog/reportLog';
import { ActivityLog } from '../../api/activityLog/activityLog';
import { TaskList, TaskSchema } from '../../api/taskList/taskList';
import { Notifications, NotificationSchema } from '../../api/notifications/notifications';

// import AddCourse from '../components/AddCourse';

/**
 * Data card x4
 * ReportFeed | TaskList
 * ActivityFeed
 */

class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.submitMessage = this.submitMessage.bind(this);
    this.submitTask = this.submitTask.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** On submit, insert the data. */
  submitMessage(data) {
    const { createdBy, content, createdAt, isNew } = data;
    Notifications.insert({
      createdBy: createdBy,
      content: content,
      createdAt: createdAt,
      isNew: isNew,
    }, this.insertCallback);
  }

  submitTask(data) {
    const { task, createdAt, isDone } = data;
    TaskList.insert({
      task: task,
      createdAt: createdAt,
      isDone: isDone,
    }, this.insertCallback);
  }

  insertCallback(error) {
    if (error) {
      Bert.alert({
        type: 'danger',
        message: `Add failed: ${error.message}`,
      });
    } else {
      Bert.alert({
        type: 'success',
        message: 'Add succeeded',
        icon: 'fas fa-check',
      });
      this.formRef.reset();
    }
  }
/**
  testNotification() {
    const message = this.state;
    this.setState({ message: message });
    console.log(message);
  }
*/

  render() {
    return (this.props.ready) ? this.renderPage() :
        <Container className="page-container">
          <Loader active>Getting data</Loader>
        </Container>;
  }

  renderPage() {
    // console.log(`createdBy: ${Meteor.user().username}, content: content, createdAt: ${new Date()}, isNew: ${true}`);
    return (
        <div className="page-container">
          <Grid container>
            {/** --------------------------------- ROW 1 ---------------------------------*/}
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

            {/** --------------------------------- ROW 2 ---------------------------------*/}
            <Grid.Row centered style={{ marginBottom: '14px' }}>
              <Grid.Column>
                <div id={'global-message'}><AutoForm ref={(ref) => {
                  this.formRef = ref;
                }} schema={NotificationSchema} onSubmit={this.submitMessage}>
                  <Segment>
                    <TextField label={<Header content={'Global Alert'}/>} name={'content'}/>
                    <SubmitField value='Submit'/>
                    <ErrorsField/>
                    <HiddenField name={'createdBy'} value={Meteor.user().username}/>
                    <HiddenField name={'createdAt'} value={new Date()}/>
                    <HiddenField name={'isNew'} value={true}/>
                  </Segment>
                </AutoForm></div>
              </Grid.Column>
            </Grid.Row>

            {/** --------------------------------- ROW 3 ---------------------------------*/}
            <Grid.Row centered columns={2}>
              {/** Might need to add overflow: scroll to css for this component to allow list to be scrolled */}
              <Grid.Column>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>Active Reports</Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <Feed id={'active-reports'}>
                      {this.props.reports.map((data, index) => <ReportItem key={index}
                                                                           reportItem={data}/>)}
                    </Feed>
                  </Card.Content>
                </Card>
              </Grid.Column>

              <Grid.Column>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>
                      Task List
                      <Modal trigger={
                        <Button icon={'plus'}
                                size={'mini'}
                                floated={'right'}
                                className={'clear-button'}
                                onClick={this.addTask}/>
                      }>
                        <Modal.Header>Add a task</Modal.Header>
                        <Modal.Content>
                          <AutoForm ref={(ref) => {
                            this.formRef = ref;
                          }} schema={TaskSchema} onSubmit={this.submitTask}>
                              <TextField label={'Task'} name={'task'}/>
                              <SubmitField value='Submit'/>
                              <ErrorsField/>
                              <HiddenField name={'createdAt'} value={new Date()}/>
                              <HiddenField name={'isDone'} value={false}/>
                          </AutoForm>
                        </Modal.Content>
                      </Modal>
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <Feed id={'task-list'}>
                      {this.props.taskList.map((data, index) => <TaskItem key={index}
                                                                          taskItem={data}/>)}
                    </Feed>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>

            {/** --------------------------------- ROW 4 ---------------------------------*/}
            <Grid.Row centered>
              <Grid.Column>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>Admin Activity Report</Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <Feed id={'activity-feed'}>
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
  const notifSub = Meteor.subscribe('Notifications');
  return {
    profiles: Profiles.find({}).fetch(),
    sessions: Sessions.find({}).fetch(),
    reports: ReportLog.find({}).fetch(),
    activityLog: ActivityLog.find({}).fetch(),
    taskList: TaskList.find({}).fetch(),
    notifications: Notifications.find({}).fetch(),
    ready: (
        profileSub.ready() &&
        sessionsSub.ready() &&
        reportLogSub.ready() &&
        activitySub.ready() &&
        taskSub.ready() &&
        notifSub.ready()
    ),
  };
})(Admin);
