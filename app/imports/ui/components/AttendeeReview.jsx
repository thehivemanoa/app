import React from 'react';
import { List, Image } from 'semantic-ui-react';
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
          <List.Item>
            <img
                onClick={() => this.props.setAttendeeScore(this.props.attendee.owner, index + 1)}
                src="/images/honey.png"
                style={style}
            />
          </List.Item>
      );
    });

    return (
        <List.Item>
          <Image src={this.props.attendee.image} avatar style={{ height: '74px', width: '74px' }}/>
          <List.Content>
            <List.Header style={{ lineHeight: '28px' }}>
              {`${this.props.attendee.firstName} ${this.props.attendee.lastName}`}
            </List.Header>
            <List.Description>
              <List horizontal>
                {honeyButtons}
              </List>
            </List.Description>
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
