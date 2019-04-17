import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Grid, Card, Image, Icon, Progress, Tab } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Courses } from '/imports/api/course/course';
import { DragDropContext } from 'react-beautiful-dnd';
import Course from '/imports/ui/components/CourseCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    // this.print = this.print.bind(this);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // print() {
  //
  // }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    const panes = [
      {
        menuItem: 'Information',
        pane: (
            <Tab.Pane attached={false} key={'Information'}>
              <p>First Name: {this.props.firstName}</p>
              <p>Last Name: {this.props.lastName}</p>
              <p>Email: {this.props.email}</p>
            </Tab.Pane>
        ),
      },
      {
        menuItem: 'Course',
        pane: (
            <Tab.Pane attached={false} key={'Course'}>
              <Card.Group>
                {this.props.course.map((course) => <Course course={course}/>)}
              </Card.Group>
            </Tab.Pane>
        ),
      },
      {
        menuItem: 'Notifications',
        pane: (
            <Tab.Pane attached={false} key={'Notifications'}>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores, laudantium libero minima
                soluta tempora! Accusamus adipisci, blanditiis commodi culpa cum cupiditate dolor ea error esse
                explicabo fuga ipsum labore minima minus obcaecati officia praesentium, quae quos ratione reiciendis
                saepe sit tempora ullam unde voluptatum? Accusamus animi asperiores at cupiditate eius fugiat harum
                ipsa, laborum minima neque nisi officia perferendis perspiciatis, quaerat ratione repellendus, suscipit.
                A est iusto magnam perspiciatis placeat quas quasi quod reiciendis rerum saepe. A alias aliquam
                aspernatur atque corporis dignissimos enim et explicabo laboriosam maiores molestias natus nemo nisi,
                officiis quia ratione rerum vel voluptatibus? Ea!</p>
            </Tab.Pane>),
      }
    ];

    const containerPadding = {
      paddingTop: 20,
      paddingBottom: 30,
      paddingLeft: 50,
      paddingRight: 50,
      minHeight: '70vh',
    };

    const center = {
      position: 'absolute',
      left: '.8em',
      bottom: '.6em',
      width: '100%',
      textAlign: 'center',
      fontSize: '1em',
    };

    const xpIcon = {
      fontSize: '3em',
      width: '100%',
      height: '0',
    };

    return (
        <Container className="profile-page" style={containerPadding} fluid>
          <Card style={{ float: 'left', marginRight: '3em' }}>
            <Card.Content>
              <Image src={this.props.image} circular
                     style={{ marginBottom: 5 }}/>
              <div className="non-semantic-protector">
                <h1 className="ribbon">
                  <strong className="ribbon-content">{this.props.firstName} {this.props.lastName}</strong>
                </h1>
                <Grid columns={2} verticalAlign='middle'>
                  <Grid.Column width={3}>
                    {/** Honey pot with level */}
                    <div style={{ position: 'relative' }}>
                      <Icon name="star outline" style={xpIcon}/>
                      <div style={center}>
                        <h2 style={{ fontSize: 18 }}>{this.props.level}</h2>
                      </div>
                    </div>
                  </Grid.Column>
                  <Grid.Column width={13}>
                    <Grid.Row>
                      {/** current/total XP */}
                      <p>{this.props.exp} XP</p>
                    </Grid.Row>
                    <Grid.Row>
                      {/** Progress Bar */}
                      <Progress value={this.props.exp} total='100' progress='percent'/>
                    </Grid.Row>
                  </Grid.Column>
                </Grid>
              </div>
            </Card.Content>
          </Card>
          <Tab menu={{ secondary: true, pointing: true, fluid: true, vertical: true }} menuPosition={'right'}
               panes={panes}
               renderActiveOnly={false}/>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserProfile.propTypes = {
  ready: PropTypes.bool.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  exp: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  joined: PropTypes.array.isRequired,
  created: PropTypes.array.isRequired,
  course: PropTypes.array,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
/** export default withTracker(() => {
            // Get access to Profile documents.
            const subscription = Meteor.subscribe('Profiles');
            return {
              stuffs: Stuffs.find({}).fetch(),
              ready: subscription.ready(),
            };

            // Get access to Profile documents.

          })(UserProfile); */


export default withTracker(() => {
  const subscription = Meteor.subscribe('Course');
  return {
    firstName: Meteor.user() ? Meteor.user().profile.firstName : '',
    lastName: Meteor.user() ? Meteor.user().profile.lastName : '',
    level: Meteor.user() ? Meteor.user().profile.level : '',
    exp: Meteor.user() ? Meteor.user().profile.exp : '',
    email: Meteor.user() ? Meteor.user().username : '',
    image: Meteor.user() ? Meteor.user().profile.image : '',
    joined: Meteor.user() ? Meteor.user().profile.joinedSessions : [],
    created: Meteor.user() ? Meteor.user().profile.createdSessions : [],
    course: Courses.find({}).fetch(),
    ready: subscription.ready(),
  };
})(UserProfile);
