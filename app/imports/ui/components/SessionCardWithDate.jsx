import React from 'react';
import PropTypes from 'prop-types';
import { Card, Header, Grid, Button, Icon } from 'semantic-ui-react';
import dateFns from 'date-fns';

export default class SessionCardWithDate extends React.Component {
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
    const formattedDate = `${dateFns.format(startTime, 'dddd')}, ${dateFns.format(startTime, 'MMMM')} ` +
        `${dateFns.format(startTime, 'D')}`;

    return (
        <Card fluid>
          <Card.Content>
            <Grid>
              <Grid.Column>
                {this.props.title}
              </Grid.Column>
              <Grid.Column>
                {formattedDate}
              </Grid.Column>
              <Grid.Column></Grid.Column>
              <Grid.Column></Grid.Column>
              <Grid.Column></Grid.Column>
            </Grid>
          </Card.Content>
        </Card>
    );
  }
}

SessionCardWithDate.propTypes = {
  session: PropTypes.object.isRequired,
};
