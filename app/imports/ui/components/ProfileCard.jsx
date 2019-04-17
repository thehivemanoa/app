import React from 'react';
import PropTypes from 'prop-types';
import { Card,  Grid, Icon, Image, Progress } from 'semantic-ui-react';

export default class ProfileCard extends React.Component {
  render() {

    const center = {
      position: 'absolute',
      left: '.8em',
      bottom: '.6em',
      width: '100%',
      textAlign: 'center',
      fontSize: '1em',
    }

    const xpIcon = {
      fontSize: '3em',
      width: '100%',
      height: '0',
    }

    return (
        <Card style={{ float: 'left', marginRight: '3em' }}>
          <Card.Content>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' circular
                   style={{ marginBottom: 5 }}/>
            <div className="non-semantic-protector">
              <h1 className="ribbon">
                <strong className="ribbon-content">John Smith</strong>
              </h1>
              <Grid columns={2} verticalAlign='middle'>
                <Grid.Column width={3}>
                  {/** Honey pot with level */}
                  <div style={{ position: 'relative' }}>
                    <Icon name="star outline" style={xpIcon}/>
                    <div style={center}>
                      <h2 style={{ fontSize: 18 }}>12</h2>
                    </div>
                  </div>
                </Grid.Column>
                <Grid.Column width={13}>
                  <Grid.Row>
                    {/** current/total XP */}
                    <p>800/1000 XP</p>
                  </Grid.Row>
                  <Grid.Row>
                    {/** Progress Bar*/}
                    <Progress value='4' total='5' progress='percent'/>
                  </Grid.Row>
                </Grid.Column>
              </Grid>
            </div>
          </Card.Content>
        </Card>
    );
  }
}

ProfileCard.propTypes = {
  profile: PropTypes.object.isRequired,
};
