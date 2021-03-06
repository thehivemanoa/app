import React from 'react';
import { List, Image, Header, Button, Grid, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const _ = require('underscore');

export default class AttendeeReview extends React.Component {
  state = { modalOpen: false };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

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
                <Modal trigger={
                  <Button icon="flag"
                          open={this.handleOpen}
                          onClose={this.handleClose}
                          style={{ backgroundColor: 'Transparent', marginLeft: '10px', opacity: 0.20 }}/>
                  }>
                  <Header icon='flag' content='Report User' />
                  <Modal.Content>
                    <h3>What is your reason for reporting this user?</h3>
                    <p> Sorry this feature has not been implemented yet. </p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color='red' floated='right' onClick={this.handleClose} inverted>
                      Submit Report
                    </Button>
                  </Modal.Actions>
                </Modal>
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
