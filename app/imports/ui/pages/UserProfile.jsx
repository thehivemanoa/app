import React from 'react';
import Alert from 'react-s-alert';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Image, Tab, Modal, Divider, Button, Form } from 'semantic-ui-react';
import { Courses } from '../../api/courses/courses';
import { withTracker } from 'meteor/react-meteor-data';
import ProfileCard from '../components/ProfileCard';
import PropTypes from 'prop-types';

const _ = require('underscore');

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    const firstName = this.props.firstName;
    const lastName = this.props.lastName;
    const email = this.props.username;

    this.state = ({
      editing: false,
      activeIndex: 0,
      firstName: firstName,
      lastName: lastName,
      email: email,
      submittedFirstName: firstName,
      submittedLastName: lastName,
      submittedEmail: email,
      activeCourses: [],
      userCourses: [],
      workerBee: [],
      royalBee: [],
      ready: false,
    });

    this.info = this.info.bind(this);
    this.pic = this.pic.bind(this);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.updateState = this.updateState.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
    this.renderInfoNormal = this.renderInfoNormal.bind(this);
    this.renderInfoForm = this.renderInfoForm.bind(this);
    this.renderPicNormal = this.renderPicNormal.bind(this);
    this.renderPicForm = this.renderPicForm.bind(this);
    this.initializeCourses = this.initializeCourses.bind(this);

    console.log('state: { editing: false }');
  }

  initializeCourses() {
    const courses = this.props.userCourses;
    const list = _.pluck(this.props.courses, 'course');
    this.setState({
      userCourses: _.keys(courses, 'courses'),
    });
    this.forceUpdate();
    this.setState({
      activeCourses: _.difference(list, this.state.userCourses),
    });
  }

  edit() {
    this.setState({
      editing: true
    });
    console.log('state: { editing: true }');
  }

  save() {
    this.setState({
      editing: false
    });
    console.log('state: { editing: false }');
  }

  submitInfo() {
    const { firstName, lastName } = this.state;
    this.setState({
      submittedFirstName: firstName,
      submittedLastName: lastName
    });

    const currentUserId = this.props.currentUser._id;
    console.log('Updating Profile: ' + currentUserId);

    Meteor.users.update(
        currentUserId,
        {
          $set: {
            "profile.firstName": firstName,
            "profile.lastName": lastName,
          },
        }, (error) => (error ?
            Alert.error('Update failed: ' + `${error.message}`, {
              effect: 'slide',
            }) :
            Alert.success('Update succeeded', {
              effect: 'slide',
            })),
    );
    return this.save()
  };

  updateState = (e, { name, value }) => this.setState({ [name]: value });

  renderInfoNormal() {
    return (
        <div>
          <p>First Name: {this.state.submittedFirstName}</p>
          <p>Last Name: {this.state.submittedLastName}</p>
          <p>Email: {this.state.submittedEmail}</p>
          <Divider/>
          <Button onClick={this.edit}>Edit Profile</Button>
        </div>
    )
  }

  renderInfoForm() {
    const { firstName, lastName, email } = this.state;

    return (
        <div>
          <Form onSubmit={this.submitInfo}>
            <Form.Input label={'First Name'} name={'firstName'} value={firstName} onChange={this.updateState}/>
            <Form.Input label={'Last Name'} name={'lastName'} value={lastName} onChange={this.updateState}/>
            <Form.Input label={'Email'} name={'email'} value={email} onChange={this.updateState}/>
            <Form.Button content={'Submit'}/>
          </Form>
        </div>
    )
  }

  renderPicNormal() {
    return (
        <Image src={this.props.image} circular
               style={{ marginBottom: 5 }}/>
    )
  }

  renderPicForm() {
    return (
        <Modal id='login-modal' trigger={<Image src={this.props.image} circular disabled
                                                style={{ marginBottom: 5 }}/>}>
          <Modal.Header>Edit Profile Picture</Modal.Header>
          <Modal.Content>

          </Modal.Content>
        </Modal>
    )
  }

  info() {
    if (this.state.editing) {
      return this.renderInfoForm()
    } else {
      return this.renderInfoNormal()
    }
  }

  pic() {
    if (this.state.editing) {
      return this.renderPicForm()
    } else {
      return this.renderPicNormal()
    }
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    if (!this.state.ready && this.props.ready){
      this.initializeCourses();
      this.setState({
        ready: true,
      });
    }
    console.log(this.state.userCourses);
    console.log(this.state.activeCourses);
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const containerPadding = {
      paddingTop: 20,
      paddingBottom: 30,
      paddingLeft: 50,
      paddingRight: 50,
      minHeight: '70vh',
    };

    const panes = [
      {
        menuItem: 'Information',
        pane: (
            <Tab.Pane attached={false} key={'Information'}>
              {this.info()}
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
      }
    ];

    return (
        <Container className="profile-page" style={containerPadding} fluid>
          <ProfileCard
              firstName={this.state.submittedFirstName}
              lastName={this.state.submittedLastName}
              level={this.props.level}
              exp={this.props.exp}
              image={this.props.image}
              nextLevel={this.props.nextLevel}
          />
          <Tab menu={{ secondary: true, pointing: true, fluid: false, vertical: true }} menuPosition={'right'}
               panes={panes} renderActiveOnly={false}/>
        </Container>
    );
  }
}

/** Require an array of user documents in the props. */
UserProfile.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  level: PropTypes.number,
  exp: PropTypes.number,
  nextLevel: PropTypes.number,
  email: PropTypes.array,
  image: PropTypes.string,
  currentUser: PropTypes.object,
  courses: PropTypes.array,
  userCourses: PropTypes.object,
  username: PropTypes.string
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Courses');
  return {
    currentUser: Meteor.user(),
    firstName: Meteor.user() ? Meteor.user().profile.firstName : '',
    lastName: Meteor.user() ? Meteor.user().profile.lastName : '',
    level: Meteor.user() ? Meteor.user().profile.level : null,
    exp: Meteor.user() ? Meteor.user().profile.exp : null,
    email: Meteor.user() ? Meteor.user().emails : [],
    image: Meteor.user() ? Meteor.user().profile.image : '',
    username: Meteor.user() ? Meteor.user().username : '',
    nextLevel: Meteor.user() ? Math.round(50 * (0.04 * (Meteor.user().profile.level ^ 3) + 0.8 * (Meteor.user().profile.level ^ 2) + 2 * Meteor.user().profile.level)) : null,
    courses: Courses.find({}).fetch(),
    userCourses: Meteor.user() ? Meteor.user().profile.courses : {},
    ready: subscription.ready(),
  };
})(UserProfile);
