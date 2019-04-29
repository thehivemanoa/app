import React from 'react';
import Alert from 'react-s-alert';
import { Profiles } from '/imports/api/profile/profile';
import { Courses } from '/imports/api/courses/courses';
import { Meteor } from 'meteor/meteor';
import { Container, Tab, Divider, Button, Form, Card, Image, Icon, Progress, Grid, Modal, Loader }
  from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

const _ = require('underscore');

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      ready: false,
      firstName: '',
      lastName: '',
      email: '',
      image: '',
      submittedFirstName: '',
      submittedLastName: '',
      submittedEmail: '',
      submittedImage: '',
      courses: [],
      allCourses: [],
    };

    console.log(this.state);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.updateState = this.updateState.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
    this.submitPic = this.submitPic.bind(this);
    this.initialStates = this.initialStates.bind(this);
  }

  edit() {
    this.setState({
      editing: true,
    });
  }

  save() {
    this.setState({
      editing: false,
    });
  }

  submitInfo() {
    const { firstName, lastName } = this.state;
    this.setState({
      submittedFirstName: firstName,
      submittedLastName: lastName,
    });

    const id = this.props.profile._id;

    Profiles.update(id, { $set: { firstName, lastName } },
        (error) => (error ?
            Alert.error(`Update failed: ${error.message}`, {
              effect: 'slide',
            }) :
            Alert.success('Update succeeded', {
              effect: 'slide',
            })));
    return this.save();
  }

  submitPic() {
    const image = this.state.image;
    this.setState({
      submittedImage: image,
    });

    const id = this.props.profile._id;

    Profiles.update(id, { $set: { image } },
        (error) => (error ?
            Alert.error(`Update failed: ${error.message}`, {
              effect: 'slide',
            }) :
            Alert.success('Update succeeded', {
              effect: 'slide',
            })));
    return this.save();
  }

  updateState(e, { name, value }) {
    this.setState({ [name]: value });
  }

  initialStates() {
    const firstName = this.props.profile.firstName;
    const lastName = this.props.profile.lastName;
    const image = this.props.profile.image;
    const courses = _.pairs(this.props.profile.courses);
    const email = this.props.currentUser;
    const allCourses = _.pluck(this.props.courses, 'course');
    const validCourses = [];
    this.setState({
      firstName: firstName,
      lastName: lastName,
      email: email,
      image: image,
      submittedFirstName: firstName,
      submittedLastName: lastName,
      submittedEmail: email,
      submittedImage: image,
      courses: courses,
      allCourses: allCourses,
      validCourses: validCourses,
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    if (!this.state.ready && this.props.ready) {
      this.initialStates();
      this.setState({
        ready: true,
      });
    }
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {

    console.log(this.state);
    console.log(this.props.courses);

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

    const level = this.props.profile.level;
    const exp = this.props.profile.exp;
    const nextLevel = Math.round(50 * (0.04 * (level ** 3) + 0.8 * (level ** 2) + 2 * level));
    const { firstName, lastName, email } = this.state;
    const panes = [
      {
        menuItem: 'Information',
        pane: (
            <Tab.Pane attached={false} key={'Information'}>
              {this.state.editing ? (
                  <div>
                    <Form onSubmit={this.submitInfo}>
                      <Form.Input label={'First Name'} name={'firstName'}
                                  value={firstName} onChange={this.updateState}/>
                      <Form.Input label={'Last Name'} name={'lastName'} value={lastName} onChange={this.updateState}/>
                      <Form.Input label={'Email'} name={'email'} value={email} onChange={this.updateState}/>
                      <Form.Button content={'Submit'}/>
                    </Form>
                  </div>
              ) : (
                  <div>
                    <p>First Name: {this.state.submittedFirstName}</p>
                    <p>Last Name: {this.state.submittedLastName}</p>
                    <p>Email: {this.state.submittedEmail}</p>
                    <Divider/>
                    <Button onClick={this.edit}>Edit Profile</Button>
                  </div>
              )}
            </Tab.Pane>
        ),
      },
      {
        menuItem: 'Accounts',
        pane: (
            <Tab.Pane attached={false} key={'Accounts'}>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque dolore dolores, eveniet
                facilis in itaque maxime, nihil optio, quia quo recusandae reprehenderit totam. Aperiam excepturi illo
                inventore nemo nobis perspiciatis repellat vitae. At corporis iure magnam natus qui tempora, veritatis
                vitae voluptate. Beatae explicabo fugit similique suscipit voluptatem! A asperiores commodi consectetur
                cupiditate delectus dicta dolor ea eius eligendi facilis fugiat illo impedit labore libero magni minus
                non numquam obcaecati officia omnis possimus quisquam rem repellendus soluta suscipit, tenetur totam
                ullam unde ut vitae! A, assumenda, deleniti dicta eligendi maxime nesciunt nihil odio officia omnis quam
                repellat, rerum soluta.</p>
            </Tab.Pane>
        ),
      },
      {
        menuItem: 'ReportLog',
        pane: (
            <Tab.Pane attached={false} key={'ReportLog'}>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores, laudantium libero minima
                soluta tempora! Accusamus adipisci, blanditiis commodi culpa cum cupiditate dolor ea error esse
                explicabo fuga ipsum labore minima minus obcaecati officia praesentium, quae quos ratione reiciendis
                saepe sit tempora ullam unde voluptatum? Accusamus animi asperiores at cupiditate eius fugiat harum
                ipsa, laborum minima neque nisi officia perferendis perspiciatis, quaerat ratione repellendus, suscipit.
                A est iusto magnam perspiciatis placeat quas quasi quod reiciendis rerum saepe. A alias aliquam
                aspernatur atque corporis dignissimos enim et explicabo laboriosam maiores molestias natus nemo nisi,
                officiis quia ratione rerum vel voluptatibus? Ea!</p>
            </Tab.Pane>),
      },
    ];

    return (
        <Container className="page-container" fluid>
          <Card style={{ float: 'left', marginRight: '3em' }}>
            <Card.Content>
              {this.state.editing ? (
                  <div>
                    <Modal id='login-modal' trigger={<Image src={this.state.submittedImage} circular disabled
                                                            style={{ marginBottom: 5 }}/>}>
                      <Modal.Header>Edit Profile Picture</Modal.Header>
                      <Modal.Content>
                        <Form onSubmit={this.submitPic}>
                          <Form.Input label={'Image'} name={'image'}
                                      value={this.state.image} onChange={this.updateState}/>
                          <Divider/>
                          <Button onClick={this.edit}>Edit Profile</Button>
                        </Form>
                      </Modal.Content>
                    </Modal>
                  </div>
              ) : (
                  <div>
                    <Image src={this.state.submittedImage} circular
                           style={{ marginBottom: 5 }}/>
                  </div>
              )}
              <div className="non-semantic-protector">
                <h1 className="ribbon">
                  <strong className="ribbon-content">{this.state.submittedFirstName}
                    {this.state.submittedLastName}</strong>
                </h1>

                {/** Progress Bar */}
                <Grid columns={2} verticalAlign='middle'>
                  <Grid.Column width={3}>
                    {/** Change start to honey pot */}
                    <div style={{ position: 'relative' }}>
                      <Icon name="star outline" style={xpIcon}/>
                      <div style={center}>
                        <h2 style={{ fontSize: 18 }}>{level}</h2>
                      </div>
                    </div>
                  </Grid.Column>
                  <Grid.Column width={13}>
                    <Grid.Row>
                      <p>{exp}/{nextLevel} XP</p>
                    </Grid.Row>
                    <Grid.Row>
                      <Progress value={exp} total={nextLevel}/>
                    </Grid.Row>
                  </Grid.Column>
                </Grid>
              </div>
            </Card.Content>
          </Card>
          <Tab menu={{ secondary: true, pointing: true, fluid: true, vertical: true }} menuPosition={'right'}
               panes={panes} renderActiveOnly={false}/>
        </Container>
    );
  }
}

/** Require an array of user documents in the props.profile. */
UserProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string.isRequired,
  currentId: PropTypes.string.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('Profiles');
  const subscription2 = Meteor.subscribe('Courses');
  return {
    profile: Profiles.find({}).fetch()[0],
    courses: Courses.find({}).fetch(),
    currentUser: Meteor.user() ? Meteor.user().username : '',
    currentId: Meteor.user() ? Meteor.userId() : '',
    ready: (subscription.ready() && subscription2.ready()),
  };
})(UserProfile);
