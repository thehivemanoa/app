import React from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Button, Icon } from 'semantic-ui-react';
import dateFns from 'date-fns';

export default class SessionCardFlat extends React.Component {
  render() {
    const colors = {
      'ICS 311': '#E692F8',
      'ICS 314': '#FFB4B0',
    };
    const buttonContainerStyle = {
      paddingTop: '5px',
      paddingRight: '15px',
    };
    const buttonStyle = {
      backgroundColor: 'white',
    };

    const startTime = this.props.session.startTime;
    const endTime = this.props.session.endTime;
    const formattedStartTime = `${dateFns.format(startTime, 'h')}:${dateFns.format(startTime, 'mm')}` +
        ` ${dateFns.format(startTime, 'a')}`;
    const formattedEndTime = `${dateFns.format(endTime, 'h')}:${dateFns.format(endTime, 'mm')}` +
        ` ${dateFns.format(endTime, 'a')}`;
    const formattedDate = `${dateFns.format(startTime, 'dddd')}, ${dateFns.format(startTime, 'MMMM')} ` +
        `${dateFns.format(startTime, 'D')}`;

    return (
        <Card fluid style={{ backgroundColor: colors[this.props.session.course] }}>
          <Card.Content>
            <Grid columns="equal" style={{ height: '45px' }}>
              <Grid.Column>
                <p>{this.props.session.title}</p>
              </Grid.Column>
              <Grid.Column>{`${formattedStartTime} - ${formattedEndTime}`}</Grid.Column>
              <Grid.Column>
                {formattedDate}
              </Grid.Column>
              <Grid.Column width={1}></Grid.Column>
              <Grid.Column width={3}>
                <Grid>
                  <Grid.Column><Icon name="user times"/></Grid.Column>
                  <Grid.Column>1</Grid.Column>
                  <Grid.Column><Icon name="user times"/></Grid.Column>
                  <Grid.Column>0</Grid.Column>
                </Grid>
              </Grid.Column>
              <Grid.Column style={buttonContainerStyle} width={2}>
                <Button style={buttonStyle} floated="right">Join</Button>
              </Grid.Column>
            </Grid>
          </Card.Content>
        </Card>
    );
  }
}

SessionCardFlat.propTypes = {
  session: PropTypes.object.isRequired,
};
