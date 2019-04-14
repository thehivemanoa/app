import React from 'react';
import PropTypes from 'prop-types';
import { Card, Header, Grid, Button, Icon, Button } from 'semantic-ui-react';

export default class ProfileCard extends React.Component {
  render() {
    return (
        <Card fluid>
          <Card.Content>
            <Grid>
              <Grid.Row>
                {/** profile picture (popup edit pfp modal) */}
                <div className="ui placeholder">
                  <div className="image"></div>
                </div>
                <Button>Edit</Button>
              </Grid.Row>
              <Grid.Row>
                {/** Banner with user name */}
                <Header as={"h2"}>Name</Header>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column>
                  {/** Honey pot with level */}
                  <Icon name="star outline"/>
                </Grid.Column>
                <Grid.Column>
                  <Grid.Row>
                    {/** current/total XP */}
                  </Grid.Row>
                  <Grid.Row>
                    {/** Progress Bar*/}
                  </Grid.Row>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
    );
  }
}

ProfileCard.propTypes = {
  profile: PropTypes.object.isRequired,
};
