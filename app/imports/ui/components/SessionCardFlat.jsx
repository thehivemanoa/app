import React from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Button, Icon, List } from 'semantic-ui-react';
import dateFns from 'date-fns';

export default class SessionCardFlat extends React.Component {
  render() {
    const colors = {
      'ICS 311': '#E692F8',
      'ICS 314': '#FFB4B0',
    };
    const buttonContainerStyle = {
      paddingTop: '7px',
      paddingRight: '20px',
    };
    const buttonStyle = {
      backgroundColor: 'white',
    };
    const showMoreButtonStyle = {
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'Transparent',
      zIndex: 99,
    };

    const startTime = this.props.session.startTime;
    const endTime = this.props.session.endTime;
    const formattedStartTime = `${dateFns.format(startTime, 'h')}:${dateFns.format(startTime, 'mm')}` +
        ` ${dateFns.format(startTime, 'a')}`;
    const formattedEndTime = `${dateFns.format(endTime, 'h')}:${dateFns.format(endTime, 'mm')}` +
        ` ${dateFns.format(endTime, 'a')}`;
    const formattedDate = `${dateFns.format(startTime, 'dddd')}, ${dateFns.format(startTime, 'MMMM')} ` +
        `${dateFns.format(startTime, 'D')}`;
    const cardIndex = 2 * this.props.index;
    const buttonOutlineIndex = 2 * this.props.index - 1;
    const buttonIndex = 2 * this.props.index + 1;
    const cardStyle = {
      padding: 0,
      zIndex: cardIndex,
      position: 'relative',
      marginTop: '2px',
    };
    const buttonOutlineStyle = {
      position: 'relative',
      padding: 0,
      zIndex: buttonOutlineIndex,
    };
    const showMoreContainerStyle = {
      position: 'relative',
      padding: 0,
      zIndex: buttonIndex,
    };

    return [
      <List.Item key={1} style={cardStyle}>
        <Card fluid style={{
          backgroundColor: colors[this.props.session.course],
          margin: 0,
          border: 'none',
          boxShadow: 'none',
          fontSize: '12px',
        }}>
          <Card.Content>
            <Grid columns="equal" style={{ height: '45px' }}>
              <Grid.Column>{this.props.session.title}</Grid.Column>
              <Grid.Column>{this.props.session.course}</Grid.Column>
              <Grid.Column>{formattedDate}</Grid.Column>
              <Grid.Column>{`${formattedStartTime} - ${formattedEndTime}`}</Grid.Column>
              <Grid.Column width={3}>
                <Grid>
                  <Grid.Column><Icon name="user times"/></Grid.Column>
                  <Grid.Column>1</Grid.Column>
                  <Grid.Column><Icon name="user times"/></Grid.Column>
                  <Grid.Column>0</Grid.Column>
                </Grid>
              </Grid.Column>
              <Grid.Column style={buttonContainerStyle} width={2}>
                <Button style={buttonStyle} floated="right" size="mini">Join</Button>
              </Grid.Column>
            </Grid>
          </Card.Content>
        </Card>
      </List.Item>,
      <List.Item key={2} style={showMoreContainerStyle}>
        <Button icon="plus" style={{
          position: 'absolute',
          left: '100%',
          height: '18px',
          width: '18px',
          padding: 0,
          borderRadius: '50%',
          transform: 'translate(-50%,-50%)',
          backgroundColor: colors[this.props.session.course],
        }}/>
      </List.Item>,
      <List.Item key={3} style={buttonOutlineStyle}>
        <div style={{
          position: 'absolute',
          left: '100%',
          height: '22px',
          width: '22px',
          borderRadius: '50%',
          padding: 0,
          transform: 'translate(-50%,-50%)',
          backgroundColor: colors[this.props.session.course],
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'white',
        }}></div>
      </List.Item>,
    ];
  }
}

SessionCardFlat.propTypes = {
  session: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
