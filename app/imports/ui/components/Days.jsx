import React from 'react';
import { Grid } from 'semantic-ui-react';

export default class Days extends React.Component {
  render() {
    return (
        <Grid.Row columns={7}>
          <Grid.Column textAlign="center">Sunday</Grid.Column>
          <Grid.Column textAlign="center">Monday</Grid.Column>
          <Grid.Column textAlign="center">Tuesday</Grid.Column>
          <Grid.Column textAlign="center">Wednesday</Grid.Column>
          <Grid.Column textAlign="center">Thursday</Grid.Column>
          <Grid.Column textAlign="center">Friday</Grid.Column>
          <Grid.Column textAlign="center">Saturday</Grid.Column>
        </Grid.Row>
    );
  }
}
