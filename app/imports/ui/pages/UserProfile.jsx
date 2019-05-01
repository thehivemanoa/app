import React from 'react';
import Alert from 'react-s-alert';
import PropTypes from 'prop-types';
import { Profiles } from '/imports/api/profile/profile';
import { Courses } from '/imports/api/courses/courses';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Container, Tab, Divider, Button, Form, Card, Image, Icon, Progress, Grid, Modal, Loader, Input, Header }
  from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import CourseCard from '../components/CourseCard';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

const _ = require('underscore');

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      ready: false,
      activeIndex: 0,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      oldPassword: '',
      image: '',
      addCourse: '',
      addStatus: '',
      status: false,
      submittedFirstName: '',
      submittedLastName: '',
      submittedEmail: '',
      submittedImage: '',
      submittedAddStatus: '',
      courses: [],
      royal: [],
      worker: [],
      validCourses: [],
    };
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.submitCourse = this.submitCourse.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.updateState = this.updateState.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
    this.submitPic = this.submitPic.bind(this);
    this.initialStates = this.initialStates.bind(this);
    this.renderCourses = this.renderCourses.bind(this);
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

  submitCourse() {
    const user = Profiles.find({}).fetch()[0];
    let status = false;
    if (this.state.addStatus === 'royal') {
      status = true;
    }
    Profiles.update(user._id, { $set: { [`courses.${this.state.addCourse}`]: status } },
        (error) => (error ?
            Alert.error(`Update failed: ${error.message}`, {
              effect: 'slide',
            }) :
            Alert.success('Update succeeded', {
              effect: 'slide',
            })));
    document.location.reload(true);
  }

  submitInfo() {
    const { firstName, lastName, email, password, oldPassword } = this.state;
    const id = this.props.profile._id;
    this.setState({
      submittedFirstName: firstName,
      submittedLastName: lastName,
      submittedEmail: email,
    });

    Profiles.update(id, {
          $set: {
            firstName: firstName,
            lastName: lastName,
          },
        },
        (error) => (error ?
            Alert.error(`Update failed: ${error.message}`, {
              effect: 'slide',
            }) :
            ''));
    Meteor.users.update(this.props.currentId, {
      $set: {
        'emails.0.address': email,
      },
    });
    if (password === '' && oldPassword === '') {
      Alert.success('Update Successful', {
        effect: 'slide',
      });
    } else {
      Accounts.changePassword(oldPassword, password, function (error) {
        if (!error) {
          Alert.success('Update Successful', {
            effect: 'slide',
          });
        } else {
          Alert.error(`Update failed: ${error.message}`, {
            effect: 'slide',
          });
        }
      });
    }
    this.setState({
      password: '',
      oldPassword: '',
    });
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

  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex, editing: false });

  updateState(e, { name, value }) {
    this.setState({ [name]: value });
  }

  initialStates() {
    const firstName = this.props.profile.firstName;
    const lastName = this.props.profile.lastName;
    const image = this.props.profile.image;
    const courses = this.props.profile.courses;
    const pairCourses = _.pairs(courses);
    const email = Meteor.user().emails[0].address;
    const allCourses = _.pluck(this.props.courses, 'course');
    const validCourses = _.clone(_.filter(allCourses,
        course => !_.contains(_.keys(courses), course))).sort(function (a, b) {
      if (a < b) return -1;
      if (b < a) return 1;
      return 0;
    });
    this.setState({
      firstName: firstName,
      lastName: lastName,
      email: email,
      image: image,
      submittedFirstName: firstName,
      submittedLastName: lastName,
      submittedEmail: email,
      submittedImage: image,
      courses: pairCourses,
      validCourses: validCourses,
    });
    const royal = _.clone(_.map(_.filter(pairCourses,
        pair => pair[1]), pair => pair[0])).sort(function (a, b) {
      if (a < b) return -1;
      if (b < a) return 1;
      return 0;
    });
    const worker = _.clone(_.map(_.filter(pairCourses,
        pair => !pair[1]), pair => pair[0])).sort(function (a, b) {
      if (a < b) return -1;
      if (b < a) return 1;
      return 0;
    });
    this.setState({
      royal: royal,
      worker: worker,
    });
  }

  renderCourses() {
    const status = [
      { key: 'r', text: 'Royal Bee', value: 'royal' },
      { key: 'w', text: 'Worker Bee', value: 'worker' },
    ];

    let i = -1;

    const validCourses = _.map(this.state.validCourses, function (val) {
      i++;
      return { key: i, text: val, value: val };
    });

    const { addCourse, addStatus, royal, worker } = this.state;

    if (this.state.activeIndex === 0) {
      return (
          <Container textAlign='center'>
            <Grid>
              <Grid.Row>
                <Container fluid>
                  {_.map(royal, (course, index) => <CourseCard key={index} course={course} admin={false}/>)}
                  {_.map(worker, (course, index) => <CourseCard key={index} course={course} admin={false}/>)}
                </Container>
              </Grid.Row>
              <Grid.Row>
                <Container fluid textAlign='left' style={{ padding: 14 }}>
                  <Divider/>
                  {/** ADD COURSE FORM */}
                  <h2 style={{ fontSize: 14 }}>Would you like to add a course?</h2>
                  <Container style={{ paddingLeft: 20 }}>
                    <Form id='add-course' onSubmit={this.submitCourse}>
                      <Form.Group inline>
                        <Form.Dropdown
                            fluid search selection
                            options={validCourses}
                            name={'addCourse'}
                            value={addCourse}
                            onChange={this.updateState}
                            placeholder={'Select Course'}
                            style={{ minWidth: 150 }}
                        />
                        <Form.Dropdown
                            fluid search selection
                            options={status}
                            name={'addStatus'}
                            value={addStatus}
                            onChange={this.updateState}
                            placeholder={'Select Status'}
                            style={{ minWidth: 150 }}
                        />
                        <Form.Button floated='right' color='green' inverted circular icon='plus'/>
                      </Form.Group>
                    </Form>
                  </Container>
                </Container>
              </Grid.Row>
            </Grid>
          </Container>
      );
    }
    return '';
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    if (!this.state.ready && this.props.ready) {
      this.initialStates();
      this.setState({
        ready: true,
      });
    }
    return (this.props.ready) ? this.renderPage() :
        <Container className="page-container">
          <Loader active>Getting data</Loader>
        </Container>;
  }

  renderPage() {
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
    const { firstName, lastName, email, password, oldPassword } = this.state;
    // const courseOptions = [];
    // const statusOptions = [
    //   { key: 't', text: 'Royal Bee', value: true },
    //   { key: 'f', text: 'Worker Bee', value: false },
    // ];
    const panes = [
      {
        menuItem: 'Courses',
        pane: (
            <Tab.Pane attached={false} key={'Courses'}>
              <Header as='h2'>
                <Icon name='graduation cap'/>
                <Header.Content>
                  My Courses
                  <Header.Subheader>View, add, and edit courses</Header.Subheader>
                </Header.Content>
              </Header>
              <Divider/>
              <div>
                {this.renderCourses()}
              </div>
            </Tab.Pane>
        ),
      },
      {
        menuItem: 'Account',
        pane: (
            <Tab.Pane attached={false} key={'Account'}>
              <Header as='h2'>
                <Icon name='settings'/>
                <Header.Content>
                  Account Settings
                  <Header.Subheader>Manage your account information</Header.Subheader>
                </Header.Content>
              </Header>
              {this.state.editing ? (
                  <div>
                    <Form id='edit-account' onSubmit={this.submitInfo}>
                      <Form.Field>
                        <label style={{ float: 'left', fontSize: '1em' }}>First Name:</label>
                        <span style={{ display: 'block', overflow: 'hidden', padding: '0 4px 0 6px' }}>
                        <Input fluid transparent
                               name={'firstName'}
                               value={firstName}
                               onChange={this.updateState}
                        />
                        </span>
                      </Form.Field>
                      <Form.Field>
                        <label style={{ float: 'left', fontSize: '1em' }}>Last Name:</label>
                        <span style={{ display: 'block', overflow: 'hidden', padding: '0 4px 0 6px' }}>
                        <Input fluid transparent
                               name={'lastName'}
                               value={lastName}
                               onChange={this.updateState}
                        />
                        </span>
                      </Form.Field>
                      <Form.Field>
                        <label style={{ float: 'left', fontSize: '1em' }}>Email:</label>
                        <span style={{ display: 'block', overflow: 'hidden', padding: '0 4px 0 6px' }}>
                        <Input fluid transparent
                               name={'email'}
                               value={email}
                               onChange={this.updateState}
                        />
                        </span>
                      </Form.Field>
                      <Form.Field>
                        <label style={{ float: 'left', fontSize: '1em' }}>Old Password:</label>
                        <span style={{ display: 'block', overflow: 'hidden', padding: '0 4px 0 6px' }}>
                        <Input fluid transparent
                               name={'oldPassword'}
                               value={oldPassword}
                               onChange={this.updateState}
                        />
                        </span>
                      </Form.Field>
                      <Form.Field>
                        <label style={{ float: 'left', fontSize: '1em' }}>New Password:</label>
                        <span style={{ display: 'block', overflow: 'hidden', padding: '0 4px 0 6px' }}>
                        <Input fluid transparent
                               name={'password'}
                               value={password}
                               onChange={this.updateState}
                        />
                        </span>
                      </Form.Field>
                      <Divider/>
                      <Form.Button floated='right' content={'Save Changes'} basic color={'green'}/>
                    </Form>
                  </div>
              ) : (
                  <div>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>
                        First Name: </span>
                      {this.state.submittedFirstName}
                    </p>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>
                        Last Name: </span>
                      {this.state.submittedLastName}</p>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>
                        Email: </span>
                      {this.state.submittedEmail}
                    </p>
                    <Divider/>
                    <Button floated='right' onClick={this.edit} basic>
                      <Icon name="pencil alternate"/> Edit Profile
                    </Button>
                  </div>
              )}
            </Tab.Pane>
        ),
      },
    ];

    return (
        <div>
          <Container className="page-container" fluid>
            <Card style={{ float: 'left', marginRight: '3em' }}>
              <Card.Content>
                {this.state.editing ? (
                    <div>
                      <Modal
                          id='login-modal'
                          trigger={
                            <Container
                                style={{
                                  position: 'relative',
                                  background: '#14171a',
                                  borderRadius: '50%',
                                  marginBottom: 5,
                                }}>
                              <Image src={this.state.submittedImage} circular disabled style={{}}/>
                              <Container style={{ position: 'absolute', top: '37%', left: '0%' }}>
                                <Container
                                    textAlign='center'
                                    style={{ color: 'whitesmoke', fontSize: '1.5em' }}>
                                  <Icon size='big' name='image outline'/>
                                  <br/>Change<br/>Profile Photo
                                </Container>
                              </Container>

                            </Container>
                          }
                      >
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
                    <strong className="ribbon-content">
                      {this.state.submittedFirstName} {this.state.submittedLastName}</strong>
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
            <Tab
                id="profile-tabs"
                menu={{ secondary: true, pointing: true, fluid: true, vertical: true }}
                menuPosition={'right'}
                panes={panes}
                grid={{ paneWidth: 12, tabWidth: 4 }}
                renderActiveOnly={false}
                onTabChange={this.handleTabChange}/>
          </Container>
        </div>
    );
  }
}

/** Require an array of user documents in the props.profile. */
UserProfile.propTypes = {
  profile: PropTypes.object,
  courses: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string.isRequired,
  currentId: PropTypes.string.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('Profile');
  const subscription2 = Meteor.subscribe('Courses');
  let profile = {};
  if (subscription.ready() && subscription2.ready() && Meteor.user()) {
    profile = Profiles.findOne({ owner: Meteor.user().username });
  }
  return {
    profile: profile,
    courses: Courses.find({}).fetch(),
    currentUser: Meteor.user() ? Meteor.user().username : '',
    currentId: Meteor.user() ? Meteor.userId() : '',
    ready: (subscription.ready() && subscription2.ready()),
  };
})(UserProfile);
