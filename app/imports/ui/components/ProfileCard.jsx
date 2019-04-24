import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Card, Grid, Icon, Image, Progress } from 'semantic-ui-react';

export default class ProfileCard extends React.Component {
  render() {

    const center = {
      position: 'absolute',
      left: '.8em',
      bottom: '.6em',
      width: '100%',
      textAlign: 'center',
      fontSize: '1em',
    };

    const xpIcon = {
      fontSize: '3em',
      width: '100%',
      height: '0',
    };

    return (
        <Card style={{ float: 'left', marginRight: '3em' }}>
          <Card.Content>
            <Image src={this.props.image} circular
                   style={{ marginBottom: 5 }}/>
            <div className="non-semantic-protector">
              <h1 className="ribbon">
                <strong className="ribbon-content">{this.props.firstName} {this.props.lastName}</strong>
              </h1>

              {/** Progress Bar */}
              <Grid columns={2} verticalAlign='middle'>
                <Grid.Column width={3}>
                  {/** Change start to honey pot */}
                  <div style={{ position: 'relative' }}>
                    <Icon name="star outline" style={xpIcon}/>
                    <div style={center}>
                      <h2 style={{ fontSize: 18 }}>{this.props.level}</h2>
                    </div>
                  </div>
                </Grid.Column>
                <Grid.Column width={13}>
                  <Grid.Row>
                    <p>{this.props.exp}/{this.props.nextLevel} XP</p>
                  </Grid.Row>
                  <Grid.Row>
                    <Progress value={this.props.exp} total={this.props.nextLevel}/>
                  </Grid.Row>
                </Grid.Column>
              </Grid>
            </div>
          </Card.Content>
        </Card>
    );
  }
}

/** Require an array of user documents in the props. */
ProfileCard.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  level: PropTypes.number,
  exp: PropTypes.number,
  nextLevel: PropTypes.number,
  image: PropTypes.string,
};
