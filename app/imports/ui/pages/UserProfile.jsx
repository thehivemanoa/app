import React from 'react';
import Alert from 'react-s-alert';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Image, Tab, Modal, Divider, Button, Form } from 'semantic-ui-react';
import { Profiles } from '/imports/api/profile/profile';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ProfileCard from '../components/ProfileCard';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    const firstName = Profiles.findOne({ owner: this.props.currentUser }).firstName;
    const lastName = Profiles.findOne({ owner: this.props.currentUser }).lastName;
    const email = this.props.currentUser;

    this.state = ({
      editing: false,
      firstName: firstName,
      lastName: lastName,
      email: email,
      submittedFirstName: firstName,
      submittedLastName: lastName,
      submittedEmail: email,
    });

    console.log(this.state);
    this.pic = this.pic.bind(this);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.updateState = this.updateState.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
    this.renderPicNormal = this.renderPicNormal.bind(this);
    this.renderPicForm = this.renderPicForm.bind(this);
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

    const currentUserId = this.props.currentId;

    Meteor.users.update(
        currentUserId,
        {
          $set: {
            profile: {
              firstName: firstName,
              lastName: lastName,
            },
          },
        }, (error) => (error ?
            Alert.error(`Update failed: ${error.message}`, {
              effect: 'slide',
            }) :
            Alert.success('Update succeeded', {
              effect: 'slide',
            })),
    );
    return this.save();
  }

  updateState = (e, { name, value }) => this.setState({ [name]: value });

  renderPicNormal() {
    const image = Profiles.findOne({ owner: this.props.currentUser }).image;
    return (
        <Image src={image} circular
               style={{ marginBottom: 5 }}/>
    );
  }

  renderPicForm() {
    const image = Profiles.findOne({ owner: this.props.currentUser }).image;
    return (
        <Modal id='login-modal' trigger={<Image src={image} circular disabled
                                                style={{ marginBottom: 5 }}/>}>
          <Modal.Header>Edit Profile Picture</Modal.Header>
          <Modal.Content>

          </Modal.Content>
        </Modal>
    );
  }

  pic() {
    if (this.state.editing) {
      this.renderPicForm();
    } else {
      this.renderPicNormal();
    }
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return this.renderPage();
  }

  renderPage() {

    const level = Profiles.findOne({ owner: this.props.currentUser }).level;
    const exp = Profiles.findOne({ owner: this.props.currentUser }).exp;
    const image = Profiles.findOne({ owner: this.props.currentUser }).image;
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
          <ProfileCard
              firstName={this.state.submittedFirstName}
              lastName={this.state.submittedLastName}
              level={level}
              exp={exp}
              image={image}
              nextLevel={nextLevel}
          />
          <Tab menu={{ secondary: true, pointing: true, fluid: true, vertical: true }} menuPosition={'right'}
               panes={panes} renderActiveOnly={false}/>
        </Container>
    );
  }
}

/** Require an array of user documents in the props.profile. */
UserProfile.propTypes = {
  // profile: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
  currentId: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('Profiles');
  return {
    // profile: Profiles.find({}).fetch()[0],
    currentUser: Meteor.user() ? Meteor.user().username : '',
    currentId: Meteor.user() ? Meteor.userId() : '',
    ready: (subscription.ready()),
  };
})(UserProfile);
