import React from 'react';
import { List, Image, Header, Button, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const _ = require('underscore');

export default class AttendeeReview extends React.Component {
  render() {
    const honeyButtons = _.times(this.props.maxHoney, index => {
      const style = {
        width: '35px',
      };
      if (index + 1 > this.props.honey) {
        style.opacity = 0.33;
      }
      return (
          <List.Item key={index}>
            <img
                onClick={() => this.props.setAttendeeScore(this.props.attendee.owner, index + 1)}
                src="/images/honey.png"
                style={style}
            />
          </List.Item>
      );
    });

    return (
        <Grid.Column>
          <List>
            <List.Item>
              <Image src={this.props.attendee.image} avatar/>
              <List.Content verticalAlign="bottom">
                <Header
                    as="h5"
                    style={{ display: 'inline-block' }}
                >
                  {`${this.props.attendee.firstName} ${this.props.attendee.lastName}`}
                </Header>
                <Button icon="flag" style={{ backgroundColor: 'Transparent', marginLeft: '10px', opacity: 0.20 }}/>
              </List.Content>
            </List.Item>
            <List.Item style={{ paddingLeft: '-10px' }}>
              <List horizontal>
                {honeyButtons}
              </List>
            </List.Item>
          </List>
        </Grid.Column>
    );
  }
}

AttendeeReview.propTypes = {
  honey: PropTypes.number.isRequired,
  attendee: PropTypes.object.isRequired,
  setAttendeeScore: PropTypes.func.isRequired,
  maxHoney: PropTypes.number.isRequired,
};
