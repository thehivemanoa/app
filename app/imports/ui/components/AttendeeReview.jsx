import React from 'react';
import { List, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class AttendeeReview extends React.Component {
  render() {
    return (
        <List.Item>
          <Image src={this.props.attendee.image} avatar/>
          <List.Content>
            <List style={{ paddingTop: 0 }}>
              <List.Item>
                <List.Header style={{ lineHeight: '28px' }}>
                  {`${this.props.attendee.firstName} ${this.props.attendee.lastName}`}
                </List.Header>
              </List.Item>
              <List.Item></List.Item>
            </List>
          </List.Content>
        </List.Item>
    );
  }
}

AttendeeReview.propTypes = {
  attendee: PropTypes.object.isRequired,
};
