import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid } from 'semantic-ui-react';
import TaskList from '../components/TaskList';
import DataCard from '../components/DataCard';
import { Courses } from '../../api/courses/courses';
import { Sessions } from '../../api/session/session';
import AddCourse from '../components/AddCourse';

class Admin extends React.Component {
  render() {
    return (
        <Grid container>
          <Grid.Row centered columns={4}>
            <Grid.Column>
                <DataCard icon={'coffee'} value={1} text={'Ree'}/>
            </Grid.Column>
            <Grid.Column>
                <DataCard icon={'envelope'} value={2} text={'Ree'}/>
            </Grid.Column>
            <Grid.Column>
                <DataCard icon={'tag'} value={3} text={'Ree'}/>
            </Grid.Column>
            <Grid.Column>
                <DataCard icon={'comment'} value={4} text={'Ree'}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered columns={2}>
            <Grid.Column>
              <TaskList/>
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
