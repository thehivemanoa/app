import React from 'react';
import { List, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const _ = require('underscore');

export default class AttendeeReview extends React.Component {
  render() {
    const honeyButtons = _.times(this.props.maxHoney, index => {
      return (
          <List.Item>
            <img
                onClick={() => this.props.setAttendeeScore(this.props.attendee.owner, index + 1)}
                src="/images/honey.png"
                style={{ width: '35px' }}
            />
          </List.Item>
      );
    });

    return (
        <List.Item>
          <Image src={this.props.attendee.image} avatar/>
          <List.Content>
            <List style={{ paddingTop: 0 }}>
              <List.Item>
                <List.Header style={{ lineHeight: '28px' }}>
                  {`${this.props.attendee.firstName} ${this.props.attendee.lastName} ${this.props.honey} honey`}
                </List.Header>
              </List.Item>
              <List.Item>
                <List horizontal>
                  {honeyButtons}
                </List>
              </List.Item>
            </List>
          </List.Content>
        </List.Item>
    );
  }
}

AttendeeReview.propTypes = {
  honey: PropTypes.number.isRequired,
  attendee: PropTypes.object.isRequired,
  setAttendeeScore: PropTypes.func.isRequired,
  maxHoney: PropTypes.number.isRequired,
};
