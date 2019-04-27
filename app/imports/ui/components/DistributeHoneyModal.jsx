import React from 'react';
import dateFns from 'date-fns';
import { Button, Header, Label, List, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AttendeeReview from './AttendeeReview';

const _ = require('underscore');

export default class DistributeHoneyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attendeeScores: _.object(this.props.session.attendees, new Array(this.props.session.attendees.length).fill(0)),
      honeyRemaining: 6,
    };
    this.setAttendeeScore = this.setAttendeeScore.bind(this);
  }

  setAttendeeScore(username, score) {
    let changeInScore;
    if (score === this.state.attendeeScores[username]) {
      changeInScore = -score;
    } else {
      changeInScore = Math.min(score - this.state.attendeeScores[username], this.state.honeyRemaining);
    }
    this.setState(prevState => ({
      attendeeScores: {
        ...prevState.attendeeScores,
        [username]: this.state.attendeeScores[username] + changeInScore,
      },
      honeyRemaining: this.state.honeyRemaining - changeInScore,
    }));
  }

  // distributeHoney() {
  //   Sessions.update(
  //       this.props.session._id,
  //       { $set: { respondents: this.props.session.respondents + 1, [`hasResponded.${this.props.currentUserId}`]: true } }
  //   );
  //   _.mapObject(this.state.attendeeScores, (honey, username) => {
  //     const userId = Meteor.users.findOne({ username: username })._id;
  //     Sessions.update(
  //         this.props.session._id,
  //         { $set: { [`honeyDistribution.${userId}`]: this.props.session.honeyDistribution[userId] + honey } },
  //     );
  //   });
  //   Profiles.update(currentUserProfileId, { $pull: { joinedSessions: this.props.session._id } });
  // }

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
      backgroundColor: colors[this.props.session.course],
    };
    const headerTextStyle = {
      display: 'inline-block',
      marginBottom: 0,
      lineHeight: '23px',
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

    return (
        <Modal trigger={<Button style={headerButtonStyle}>Collect</Button>} size="tiny">
          <Modal.Content style={headerStyle}>
            <Header as="h3" style={headerTextStyle}>{this.props.session.title}</Header>
            <Label style={headerHoneyStyle} image>
              <img src="/images/honey.png"
                   style={{ width: '45px', marginTop: '-10px' }}/>
              {`x${this.state.honeyRemaining} remaining`}
            </Label>
          </Modal.Content>
          <Modal.Content>
            <List>
              {_.map(
                  this.props.attendeeProfiles,
                  attendee => <AttendeeReview
                      key={attendee._id}
                      attendee={attendee}
                      setAttendeeScore={this.setAttendeeScore}
                      maxHoney={6}
                      honey={this.state.attendeeScores[attendee.owner]}
                  />,
              )}
            </List>
          </Modal.Content>
          <Modal.Content>
            <Button fluid>
              Distribute Honey
            </Button>
          </Modal.Content>
        </Modal>
    );
  }
}

DistributeHoneyModal.propTypes = {
  session: PropTypes.object.isRequired,
  attendeeProfiles: PropTypes.array.isRequired,
};
