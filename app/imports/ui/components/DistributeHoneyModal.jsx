import React from 'react';
import dateFns from 'date-fns';
import { Button, Header, Label, Grid, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AttendeeReview from './AttendeeReview';

const _ = require('underscore');

export default class DistributeHoneyModal extends React.Component {
  render() {
    const colors = {
      'ICS 311': '#E692F8',
      'ICS 314': '#FFB4B0',
    };
    const headerButtonStyle = {
      position: 'absolute',
      top: '50%',
      left: '55%',
      transform: 'translate(-50%,-50%)',
      backgroundColor: 'white',
      color: 'black',
      height: '25px',
      width: '90px',
      verticalAlign: 'middle',
      textAlign: 'center',
      padding: 0,
    };
    const headerStyle = {
      backgroundColor: '#FBCE11',
    };
    const headerTextStyle = {
      display: 'inline-block',
      marginBottom: 0,
      lineHeight: '23px',
      color: 'white',
    };
    const contentStyle = {};
    const expiredContentStyle = {
      display: 'none',
    };
    if (dateFns.isAfter(new Date(), dateFns.addDays(this.props.session.endDate, 1))) {
      contentStyle.display = 'none';
      expiredContentStyle.display = '';
    }
    const headerHoneyStyle = {
      ...contentStyle,
      backgroundColor: 'white',
      float: 'right',
    };
    const noAttenbeeMessageStyle = {
      textAlign: 'center',
    };
    if (this.props.attendeeProfiles.length !== 0) {
      noAttenbeeMessageStyle.display = 'none';
    }

    return (
        <Modal
            trigger={<Button style={headerButtonStyle} onClick={this.props.handleOpen}>Distribute</Button>}
            open={this.props.modalOpen}
            closeOnDimmerClick
            onClose={this.props.handleClose}
            size="small"
            style={{ backgroundColor: '#FBCE11' }}
        >
          <Modal.Content style={headerStyle}>
            <Header as="h3" style={headerTextStyle}>{this.props.session.title}</Header>
            <Label style={headerHoneyStyle} image>
              <img src="/images/honey.png"
                   style={{ width: '45px', marginTop: '-10px' }}/>
              {`x${this.props.honeyRemaining} remaining`}
            </Label>
          </Modal.Content>
          <Modal.Content style={{ backgroundColor: 'white' }}>
            <Grid columns={2} centered>
              <Grid.Column style={noAttenbeeMessageStyle}>
                <Header as="h3" style={{ display: 'inline-block' }}>No Attenbees</Header>
              </Grid.Column>
              {_.map(
                  this.props.attendeeProfiles,
                  attendee => <AttendeeReview
                      key={attendee._id}
                      attendee={attendee}
                      setAttendeeScore={this.props.setAttendeeScore}
                      maxHoney={6}
                      honey={this.props.attendeeScores[attendee.owner]}
                  />,
              )}
            </Grid>
          </Modal.Content>
          <Modal.Content style={{ backgroundColor: '#FBCE11', paddingBottom: '20px' }}>
            <Button
                onClick={this.props.distributeHoney}
                style={{
                  backgroundColor: '#FEC63B',
                  color: 'white',
                  borderStyle: 'solid',
                  borderWidth: '3px',
                  borderColor: 'white',
                  marginBottom: '20px',
                }}
                floated="right"
            >
              Distribute Honey
            </Button>
          </Modal.Content>
        </Modal>
    );
  }
}

DistributeHoneyModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  distributeHoney: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  attendeeProfiles: PropTypes.array.isRequired,
  attendeeScores: PropTypes.object.isRequired,
  setAttendeeScore: PropTypes.func.isRequired,
  honeyRemaining: PropTypes.number.isRequired,
};
