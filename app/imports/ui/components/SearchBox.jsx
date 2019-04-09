import React from 'react';
import { Header, Card, List, Checkbox, Divider, Input, Label } from 'semantic-ui-react';

export default class SearchResults extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Header as="h5">Hello</Header>
          </Card.Content>
          <Card.Content>
            <List>
              <List.Item>
                <Divider horizontal>Hide</Divider>
                <Checkbox label="Hide joined sessions" />
                <Checkbox label="Hide conflicting sessions" />
              </List.Item>
              <List.Item>
                <Divider horizontal>Courses</Divider>
                <Input list='courses' placeholder='Choose courses...' />
                <datalist id='courses'>
                  <option value='ICS 311' />
                  <option value='ICS 314' />
                </datalist>
                <Checkbox label="Add my courses" />
                <Label.Group>
                  <Label>ICS 311</Label>
                  <Label>ICS 314</Label>
                </Label.Group>
              </List.Item>
              <List.Item>
                <Divider horizontal>Date and Time</Divider>
              </List.Item>
            </List>
          </Card.Content>
        </Card>
    );
  }
}
