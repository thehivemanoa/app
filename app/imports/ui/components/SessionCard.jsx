import React from 'react';
import PropTypes from 'prop-types';
import { Card, Header, List, Grid, Button, Icon } from 'semantic-ui-react';
import dateFns from 'date-fns';

export default class SessionCard extends React.Component {
  render() {
    const colors = {
      'ICS 311': '#E692F8',
      'ICS 314': '#FFB4B0',
    };
    const startTime = this.props.session.startTime;
    const endTime = this.props.session.endTime;
    const formattedStartTime = `${dateFns.format(startTime, 'h')}:${dateFns.format(startTime, 'mm')}` +
        ` ${dateFns.format(startTime, 'a')}`;
    const formattedEndTime = `${dateFns.format(endTime, 'h')}:${dateFns.format(endTime, 'mm')}` +
        ` ${dateFns.format(endTime, 'a')}`;
    const royalCountStyle = {
      paddingRight: '20%',
    };
    const workerCountStyle = {
      paddingLeft: '20%',
    };
    const timeStyle = {};
    const joinButtonStyle = {
      float: 'right',
    };
    const courseStyle = {
      backgroundColor: colors[this.props.session.course],
      verticalAlign: 'middle',
      height: '100%',
      position: 'relative',
    };
    const courseTextStyle = {
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      textAlign: 'center',
    };

    return (
        <Card fluid>
          <Card.Content>
            <Grid verticalAlign="middle">
              <Grid.Row style={{ padding: 0, height: '30px' }}>
                <Grid.Column style={courseStyle} width={5}>
                  <p style={courseTextStyle}>{this.props.session.course}</p>
                </Grid.Column>
                <Grid.Column width={11}>{this.props.session.title}</Grid.Column>
              </Grid.Row>
              <Grid.Row columns={6} style={{ paddingTop: '5px', paddingBottom: '5px', height: '30px', }} centered>
                <Grid.Column style={{ paddingBottom: '5px' }}>
                  <Icon name="user times" style={{ float: 'right' }}/>
                </Grid.Column>
                <Grid.Column style={{ padding: '3px' }}>
                  <Header as="h5" style={{ float: 'left' }}>1</Header>
                </Grid.Column>
                <Grid.Column style={{ paddingBottom: '5px' }}>
                  <Icon name="user times" style={{ float: 'right' }}/>
                </Grid.Column>
                <Grid.Column style={{ padding: '3px' }}>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2} style={{ padding: 0 }}>
                <Grid.Column verticalAlign="middle">
                  <p>{`${formattedStartTime} - ${formattedEndTime}`}</p>
                </Grid.Column>
                <Grid.Column style={{ padding: 3 }}>
                  <Button style={{ float: 'right' }}>Join</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
    );
  }
}

SessionCard.propTypes = {
  session: PropTypes.object.isRequired,
};
