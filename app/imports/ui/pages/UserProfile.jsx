import React from 'react';
import Alert from 'react-s-alert/';
import { Meteor } from 'meteor/meteor';
import { Accounts, AccountSchema } from '../../api/accounts/accounts';
import {
  Container,
  Loader,
  Grid,
  Card,
  Image,
  Icon,
  Progress,
  Tab,
  Divider,
  Button,
  Modal,
} from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.info = this.info.bind(this);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.state = ({ editing: false });
    console.log('state: { editing: false }');
    console.log(Meteor.userId());
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

  submitInfo(data) {
    const { firstName, lastName, email } = data;
    Meteor.users.update({ _id: Meteor.userId() }, {
      $set: {
        'emails.0.address': firstName,
        'profile.firstName': lastName,
        'profile.lastName': email
      }
    }, (error) => (error ?
        Alert.error(`Update failed: ${error.message}`, {
          position: 'top-right',
          effect: 'slide',
        }) :
        Alert.success(`Update succeeded`, {
          position: 'top-right',
          effect: 'slide',
        })));
  };

  renderInfoNormal() {
    return (
        <div>
          <p>First Name: {this.props.firstName}</p>
          <p>Last Name: {this.props.lastName}</p>
          <p>Email: {this.props.email[0].address}</p>
          <Divider/>
          <Button style={{ fluid: 'right' }} onClick={this.edit}>Edit Profile</Button>
        </div>
    )
  }

  renderInfoForm() {
    return (
        <div>
          <AutoForm schema={AccountSchema} onSubmit={this.submitInfo} model={this.props.doc}>
            <TextField name='profile.firstName' label={'First Name'} placeholder={this.props.firstName} />
            <TextField name='profile.lastName' label={'Last Name'} placeholder={this.props.lastName} />
            <TextField name='emails.0.address' label={'Email'} placeholder={this.props.email[0].address} />
            <SubmitField value='Submit' onClick={this.save}/>
          </AutoForm>
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

    return (
        <Container className="profile-page" style={containerPadding} fluid>
          <Card style={{ float: 'left', marginRight: '3em' }}>
            <Card.Content>
              {this.pic()}
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
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  level: PropTypes.string,
  exp: PropTypes.string,
  email: PropTypes.array,
  image: PropTypes.string,
  doc: PropTypes.object,
  model: PropTypes.object,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe('Notifications');
  return {
    firstName: Meteor.user() ? Meteor.user().profile.firstName : '',
    lastName: Meteor.user() ? Meteor.user().profile.lastName : '',
    level: Meteor.user() ? Meteor.user().profile.level : '',
    exp: Meteor.user() ? Meteor.user().profile.exp : '',
    email: Meteor.user() ? Meteor.user().emails : [],
    image: Meteor.user() ? Meteor.user().profile.image : '',
    doc: Accounts.findOne(documentId),
    ready: subscription.ready(),
  };
})(UserProfile);