import React from 'react';
import { Grid } from 'semantic-ui-react';

export default class Days extends React.Component {
  render() {
    return (
        <Grid.Row columns={7}>
          <Grid.Column>Sunday</Grid.Column>
          <Grid.Column>Monday</Grid.Column>
          <Grid.Column>Tuesday</Grid.Column>
          <Grid.Column>Wednesday</Grid.Column>
          <Grid.Column>Thursday</Grid.Column>
          <Grid.Column>Friday</Grid.Column>
          <Grid.Column>Saturday</Grid.Column>
        </Grid.Row>
    );
  }
}
