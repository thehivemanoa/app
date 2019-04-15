import React from 'react';
import { Grid, Header, Card } from 'semantic-ui-react';
import TaskList from '../components/TaskList'
import DataCard from '../components/DataCard';

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
            <TaskList/>
          </Grid.Row>
        </Grid>
    );
  }
}

export default Admin;
