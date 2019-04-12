import React from 'react';
import { Grid, Header, Card } from 'semantic-ui-react';
import DataCard from '../components/DataCard';

class Admin extends React.Component {
  render() {
    return (
        <Grid container>
          <Grid.Row centered columns={4}>
            <Grid.Column>
                <DataCard icon={'coffee'} value={1} text={'Way'}/>
            </Grid.Column>
            <Grid.Column>
                <DataCard icon={'envelope'} value={2} text={'Say'}/>
            </Grid.Column>
            <Grid.Column>
                <DataCard icon={'tag'} value={3} text={'Words'}/>
            </Grid.Column>
            <Grid.Column>
                <DataCard icon={'comment'} value={4} text={'You'}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

export default Admin;
