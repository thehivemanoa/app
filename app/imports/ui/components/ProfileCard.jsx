import React from 'react';
import PropTypes from 'prop-types';
import { Card, Header, Image, Grid, Button, Icon } from 'semantic-ui-react';
import dateFns from 'date-fns';

export default class ProfileCard extends React.Component {
  render() {
    return (
        <Card fluid>
          <Card.Content>
            <Grid>
              <Grid.Row>
                /* profile picture (popup edit pfp modal) */
                <Image src={}/>
                <Icon/> // add edit button
              </Grid.Row>
              <Grid.Row>
                /* Banner with user name */
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column>
                  /* Honey pot with level */
                </Grid.Column>
                <Grid.Column>
                  <Grid.Row>
                    /* current/total XP */
                  </Grid.Row>
                  <Grid.Row>
                    /* Progress Bar*/
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
