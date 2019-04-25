import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Card, Header, Grid, Button, Icon, Loader, List, Form, Divider } from 'semantic-ui-react';
import dateFns from 'date-fns';
import { Profiles } from '/imports/api/profile/profile';

const _ = require('underscore');

class SessionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  usersToLabels(users) {
    return _.map(users, user => {
      return (
          <List.Item key={user.username} style={{ display: 'inline-block' }}>
            {`${profile.firstName} ${profile.lastName}`}
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
    const headerStyle = {
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
    const style = {
      display: this.state.isCollapsed ? 'none' : '',
      textAlign: 'center',
      paddingLeft: '14px',
      paddingRight: '14px',
      paddingTop: '7px',
      paddingBottom: '7px',
    };
    const attendees = Meteor.users.find({ username: { $in: this.props.session.attendees } }).fetch();
    const royals = _.filter(attendees, attendee => attendee.profile.courses[this.props.session.course]);
    const workers = _.filter(attendees, attendee => !attendee.profile.courses[this.props.session.course]);
    const creator = Meteor.users.find({ username: this.props.session.owner }).fetch();
    const royalLabels = this.usersToLabels(royals);
    const workerLabels = this.usersToLabels(workers);
    const creatorLabel = this.usersToLabels(creator);

    return (
        <Card
            fluid
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
                  <Button style={headerButtonStyle} onClick={this.props.handleUpdate}>
                    {this.props.isJoined ? 'Leave' : 'Join'}
                  </Button>
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
              <Grid.Row columns={3} style={style}>
                <Grid.Column><Header as="h5">Royals</Header></Grid.Column>
                <Grid.Column><Header as="h5">Workers</Header></Grid.Column>
                <Grid.Column><Header as="h5">Creator</Header></Grid.Column>
              </Grid.Row>
              <Grid.Row columns={3} style={style}>
                <Grid.Column>
                  <List style={{ textAlign: 'center' }}>
                    {royalLabels}
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <List style={{ textAlign: 'center' }}>
                    {workerLabels}
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <List style={{ textAlign: 'center' }}>
                    {creatorLabel}
                  </List>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ position: 'relative', paddingTop: '10px' }}>
                <Button
                    icon={this.state.isCollapsed ? 'plus' : 'minus'}
                    onClick={this.toggleCollapsed}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      borderRadius: '50%',
                      backgroundColor: colors[this.props.session.course],
                      width: '18px',
                      height: '18px',
                      padding: 0,
                    }}
                />
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
    );
  }
}

SessionCard.propTypes = {
  isJoined: PropTypes.bool.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  // Get access to Stuff documents.
  const documentId = match.params._id;
  // Get access to Profile documents.
  const subscription = Meteor.subscribe('Profile');
  const subscription2 = Meteor.subscribe('Profiles');
  return {
    profile: Profiles.findOne(documentId),
    profiles: Profiles.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(SessionCard);
