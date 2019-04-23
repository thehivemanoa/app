import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Card, Grid, Button, Icon, List, Form, Loader, Header } from 'semantic-ui-react';
import dateFns from 'date-fns';

const _ = require('underscore');

class SessionCardFlat extends React.Component {
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
          <List.Item key={user.username}>
            {`${user.profile.firstName} ${user.profile.lastName}`}
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
    const buttonContainerStyle = {
      paddingTop: '7px',
      paddingRight: '20px',
    };
    const buttonStyle = {
      backgroundColor: 'white',
    };

    const startTime = this.props.session.startTime;
    const endTime = this.props.session.endTime;
    const formattedStartTime = `${dateFns.format(startTime, 'h')}:${dateFns.format(startTime, 'mm')}` +
        ` ${dateFns.format(startTime, 'a')}`;
    const formattedEndTime = `${dateFns.format(endTime, 'h')}:${dateFns.format(endTime, 'mm')}` +
        ` ${dateFns.format(endTime, 'a')}`;
    const formattedDate = `${dateFns.format(startTime, 'dddd')}, ${dateFns.format(startTime, 'MMMM')} ` +
        `${dateFns.format(startTime, 'D')}`;
    const cardIndex = 2 * this.props.index;
    const buttonOutlineIndex = 2 * this.props.index - 1;
    const buttonIndex = 2 * this.props.index + 1;
    const cardStyle = {
      padding: 0,
      zIndex: cardIndex,
      position: 'relative',
      marginTop: '2px',
    };
    const buttonOutlineStyle = {
      position: 'relative',
      padding: 0,
      zIndex: buttonOutlineIndex,
    };
    const showMoreContainerStyle = {
      position: 'relative',
      padding: 0,
      zIndex: buttonIndex,
    };
    const cardHeaderStyle = {
      backgroundColor: colors[this.props.session.course],
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
    };
    if (this.state.isCollapsed) {
      cardHeaderStyle.borderBottomLeftRadius = '5px';
      cardHeaderStyle.borderBottomRightRadius = '5px';
    }
    const attendees = Meteor.users.find({ username: { $in: this.props.session.attendees } }).fetch();
    const royals = _.filter(attendees, attendee => attendee.profile.courses[this.props.session.course]);
    const workers = _.filter(attendees, attendee => !attendee.profile.courses[this.props.session.course]);
    const creator = Meteor.users.find({ username: this.props.session.owner }).fetch();
    const royalLabels = this.usersToLabels(royals);
    const workerLabels = this.usersToLabels(workers);
    const creatorLabel = this.usersToLabels(creator);

    return [
      <List.Item key={1} style={cardStyle}>
        <Card
            fluid
            style={{
              margin: 0,
              boxShadow: 'none',
              fontSize: '12px',
            }}
        >
          <Card.Content style={cardHeaderStyle}>
            <Grid columns="equal" style={{ height: '45px' }}>
              <Grid.Column>{this.props.session.title}</Grid.Column>
              <Grid.Column width={3}>{`${formattedStartTime} - ${formattedEndTime}`}</Grid.Column>
              <Grid.Column width={3}>{formattedDate}</Grid.Column>
              <Grid.Column width={2}>
                {this.props.session.course}
              </Grid.Column>
              <Grid.Column width={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
                <Grid>
                  <Grid.Column><Icon name="user times"/></Grid.Column>
                  <Grid.Column>{royals.length}</Grid.Column>
                  <Grid.Column><Icon name="user times"/></Grid.Column>
                  <Grid.Column>{workers.length}</Grid.Column>
                </Grid>
              </Grid.Column>
              <Grid.Column style={buttonContainerStyle} width={2}>
                <Button
                    style={buttonStyle}
                    floated="right"
                    size="mini"
                    onClick={this.props.isConflicting ? () => '' : this.props.updateJoined}
                    disabled={this.props.isConflicting}
                >
                  {this.props.isJoined ? 'Leave' : 'Join'}
                </Button>
              </Grid.Column>
            </Grid>
          </Card.Content>
          <Card.Content
              style={{
                display: this.state.isCollapsed ? 'none' : '',
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: colors[this.props.session.course],
              }}
          >
            <Grid>
              <Grid.Column width={8}>
                <Form>
                  <Form.TextArea
                      readOnly
                      value={this.props.session.description}
                      style={{ borderStyle: 'solid', borderColor: colors[this.props.session.course] }}
                      placeholder="No description"
                  />
                </Form>
              </Grid.Column>
              <Grid.Column width={8}>
                <Grid columns={3}>
                  <Grid.Column>
                    <List>
                      <List.Item><Header as="h5">Royal Bees</Header></List.Item>
                      {royalLabels}
                    </List>
                  </Grid.Column>
                  <Grid.Column>
                    <List>
                      <List.Item><Header as="h5">Worker Bees</Header></List.Item>
                      {workerLabels}
                    </List>
                  </Grid.Column>
                  <Grid.Column>
                    <List>
                      <List.Item><Header as="h5">Creator</Header></List.Item>
                      {creatorLabel}
                    </List>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid>
          </Card.Content>
        </Card>
      </List.Item>,
      <List.Item key={2} style={showMoreContainerStyle}>
        <Button
            icon={this.state.isCollapsed ? 'plus' : 'minus'}
            onClick={this.toggleCollapsed}
            style={{
              position: 'absolute',
              left: '100%',
              height: '18px',
              width: '18px',
              padding: 0,
              borderRadius: '50%',
              transform: 'translate(-50%,-50%)',
              backgroundColor: colors[this.props.session.course],
            }}
        />
      </List.Item>,
      <List.Item key={3} style={buttonOutlineStyle}>
        <div style={{
          position: 'absolute',
          left: '100%',
          height: '22px',
          width: '22px',
          borderRadius: '50%',
          padding: 0,
          transform: 'translate(-50%,-50%)',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'white',
        }}></div>
      </List.Item>,
    ];
  }
}

SessionCardFlat.propTypes = {
  isConflicting: PropTypes.bool.isRequired,
  session: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isJoined: PropTypes.bool.isRequired,
  updateJoined: PropTypes.func.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Profiles');
  return {
    profiles: Meteor.users.find({}).fetch(),
    ready: subscription.ready(),
  };
})(SessionCardFlat);
