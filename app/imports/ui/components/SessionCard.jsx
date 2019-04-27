import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Card, Header, Grid, Button, Icon, Loader, List, Form, Image, Modal, Label } from 'semantic-ui-react';
import dateFns from 'date-fns';
import { Profiles } from '../../api/profile/profile';
import DistributeHoneyModal from './DistributeHoneyModal';

const _ = require('underscore');

class SessionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      attendeeScores: _.object(this.props.session.attendees, new Array(this.props.session.attendees.length).fill(0)),
      honeyRemaining: 6,
    };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  usersToLabels(users) {
    return _.map(users, user => {
      return (
          <List.Item key={user._id} style={{ display: 'inline-block', marginRight: '20px' }}>
            <Image src={user.image} avatar/>
            <List.Content>
              <List.Header style={{ lineHeight: '28px' }}>
                {`${user.firstName} ${user.lastName}`}
              </List.Header>
            </List.Content>
          </List.Item>
      );
    });
  }

  toggleCollapsed() {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });
  }

  render() {
    return (this.props.ready) ? this.renderComponent() : <Loader active>Getting data</Loader>;
  }

  renderComponent() {
    const attendees = Profiles.find({ owner: { $in: this.props.session.attendees } }).fetch();
    const royals = _.filter(attendees, attendee => attendee.courses[this.props.session.course]);
    const workers = _.filter(attendees, attendee => !attendee.courses[this.props.session.course]);
    const creator = Profiles.find({ username: this.props.session.owner }).fetch();
    const royalLabels = this.usersToLabels(royals);
    const workerLabels = this.usersToLabels(workers);
    const creatorLabel = this.usersToLabels(creator);
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
    const headerRowStyle = {
      padding: '0px',
      height: '40px',
    };
    const headerColumnStyle = {
      backgroundColor: colors[this.props.session.course],
      verticalAlign: 'middle',
      height: '100%',
      padding: '10px',
      // position: 'relative',
    };
    const headerStyle = {};
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
    const style = {
      display: this.state.isCollapsed ? 'none' : '',
      textAlign: 'center',
      paddingLeft: '14px',
      paddingRight: '14px',
      paddingTop: '7px',
      paddingBottom: '7px',
    };
    const showMoreButtonStyle = {
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      backgroundColor: colors[this.props.session.course],
      width: '18px',
      height: '18px',
      padding: 0,
    };
    if (this.props.isCompleted) {
      showMoreButtonStyle.display = 'none';
    }
    let button;
    if (this.props.isCompleted) {
      button = (
          <DistributeHoneyModal
              session={this.props.session}
              attendeeProfiles={Profiles.find({ owner: { $in: this.props.session.attendees } }).fetch()}
          />
      );
    } else
      if (this.props.isJoined) {
        button = <Button style={headerButtonStyle} onClick={this.props.handleUpdate}>Leave</Button>;
      } else {
        button = <Button style={headerButtonStyle} onClick={this.props.handleUpdate}>Join</Button>;
      }

    return (
        <Card
            fluid={this.props.isFluid}
            style={{
              borderColor: colors[this.props.session.course],
              borderStyle: 'solid',
              borderWidth: '1px',
              boxShadow: 'none',
            }}
        >
          <Card.Content style={{ paddingBottom: 0 }}>
            <Grid>
              <Grid.Row style={headerRowStyle}>
                <Grid.Column width={10} style={headerColumnStyle}>
                  <Header as="h5" style={headerStyle}>{this.props.session.title}</Header>
                </Grid.Column>
                <Grid.Column width={6} style={headerColumnStyle}>
                  {button}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row centered columns="equal" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                <Grid.Column>
                  <p style={{ textAlign: 'left' }}>{`${formattedStartTime} - ${formattedEndTime}`}</p>
                </Grid.Column>
                <Grid.Column width={1}><Icon name="user times"/></Grid.Column>
                <Grid.Column width={1}>{royals.length}</Grid.Column>
                <Grid.Column width={1}><Icon name="user times"/></Grid.Column>
                <Grid.Column width={1}>{workers.length}</Grid.Column>
              </Grid.Row>
              <Grid.Row style={style}>
                <Form style={{ width: '100%' }}>
                  <Form.TextArea value={this.props.session.display} readOnly placeholder="No description"/>
                </Form>
              </Grid.Row>
              <Grid.Row style={style}>
                <Header as="h5">Creator</Header>
              </Grid.Row>
              <Grid.Row columns={3} style={style}>
                <List style={{ textAlign: 'center' }}>
                  {creatorLabel}
                </List>
              </Grid.Row>
              <Grid.Row style={style}>
                <Header as="h5">Royal Bees</Header>
              </Grid.Row>
              <Grid.Row columns={3} style={style}>
                <List style={{ textAlign: 'center' }}>
                  {royalLabels}
                </List>
              </Grid.Row>
              <Grid.Row style={style}>
                <Header as="h5">Worker Bees</Header>
              </Grid.Row>
              <Grid.Row columns={3} style={style}>
                <List style={{ textAlign: 'center' }}>
                  {workerLabels}
                </List>
              </Grid.Row>
              <Grid.Row style={{ position: 'relative', paddingTop: '10px' }}>
                <Button
                    icon={this.state.isCollapsed ? 'plus' : 'minus'}
                    onClick={this.toggleCollapsed}
                    style={showMoreButtonStyle}
                />
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
    );
  }
}

SessionCard.propTypes = {
  isFluid: PropTypes.bool,
  isCompleted: PropTypes.bool,
  isJoined: PropTypes.bool,
  handleUpdate: PropTypes.func,
  session: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Profiles');
  return {
    profiles: Meteor.users.find({}).fetch(),
    ready: subscription.ready(),
  };
})(SessionCard);
