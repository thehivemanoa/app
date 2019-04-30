import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import {
  Menu,
  Header,
  Popup,
  Label,
  Divider,
  Icon,
  Modal,
  Form,
  Image,
  Container,
  Loader,
} from 'semantic-ui-react';
import { Profiles } from '/imports/api/profile/profile';
import { Roles } from 'meteor/alanning:roles';

// import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  /** Handle Signin submission using Meteor's account mechanism. */
  handleSubmit() {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  render() {
    return (this.props.ready) ? this.renderNavBar() :
        <Container className="page-container">
          <Loader active>Getting data</Loader>
        </Container>;
  }

  renderNavBar() {
    /**
     * This wasn't working because the profiles subscription returns an array.
     * Had to grab the info like this since findOne didnt want to play nicely in the profiles collection.
     */
    const firstName = this.props.profile[0].firstName;
    const lastName = this.props.profile[0].lastName;
    const image = this.props.profile[0].image;

    const menuStyle = {
      borderRadius: '0',
      padding: '5px 25px 5px 25px',
      backgroundColor: '#081B34',
      alignItems: 'baseline',
    };

    const popupStyle = {
      padding: '0',
      borderRadius: '0',
      width: '175px',
      backgroundColor: '#081B34',
      border: 'none',
      textAlign: 'right',
    };

    const titleStyle = {
      fontSize: '50px',
      fontWeight: 300,
      fontFamily: 'Montserrat',
    };

    const topLogo = {
      paddingRight: 0,
      paddingTop: 0,
      paddingLeft: 0,
      bottom: 'auto',
      top: 10,
    };

    return (
        <Container>
          <Menu className="ui borderless top fixed menu" style={menuStyle}>
            <Menu.Item style={topLogo}>
              <Image size="tiny" src="images/white-inverted-logo.png"/>
            </Menu.Item>
            <Menu.Item>
              <Header style={titleStyle} inverted as={'a'} href={'/'}>WAGGLE</Header>
            </Menu.Item>

            {this.props.currentUser === '' ? (
                <Menu.Menu position='right'>
                  <Modal id='login-modal' trigger={<Menu.Item style={{ color: 'white' }}>Log In</Menu.Item>}>
                    <Modal.Header>Log in to your account</Modal.Header>
                    <Modal.Content>
                      <Form onSubmit={this.handleSubmit}>
                        <Form.Input
                            label="Email"
                            icon="user"
                            iconPosition="left"
                            name="email"
                            type="email"
                            placeholder="E-mail address"
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            label="Password"
                            icon="lock"
                            iconPosition="left"
                            name="password"
                            placeholder="Password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <Form.Button content="Submit">Log In</Form.Button>
                      </Form>
                    </Modal.Content>
                  </Modal>
                </Menu.Menu>

            ) : ''}

            {this.props.currentUser ? (
                <Menu.Menu position={'right'}>
                  <Menu.Item as={NavLink} exact to='/' content={'Home'}
                             className='collapsable'
                             style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                             position='right'/>

                  <Menu.Item as={NavLink} exact to='/addsession' content={'Create a Session'}
                             className='collapsable'
                             style={{ color: 'rgba(255, 255, 255, 0.9)' }}/>

                  <Menu.Item as={NavLink} exact to='/Calendar' content={'Calendar'}
                             className='collapsable'
                             style={{ color: 'rgba(255, 255, 255, 0.9)' }}/>

                  <Menu.Item as={NavLink} exact to='/Search' content={'Search'}
                             className='collapsable'
                             style={{ color: 'rgba(255, 255, 255, 0.9)' }}/>

                  <Menu.Item as={NavLink} exact to='' content={'Leaderboard'}
                             className='collapsable'
                             style={{ color: 'rgba(255, 255, 255, 0.9)' }}/>

                  {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                      <Menu.Item as={NavLink} exact to="/admin" content={'Admin'}
                                 className='collapsable'
                                 style={{ color: 'rgba(255, 255, 255, 0.9)' }}/>) : ''}
                  <Popup basic
                         className="collapsable"
                         on={'click'}
                         horizontalOffset={15}
                         verticalOffset={-4}
                         style={popupStyle}
                         hideOnScroll
                         trigger={
                           <Label className="collapsable"
                                  as='a' style={{ background: 'transparent', position: 'relative' }}>
                             <Image avatar spaced='right' src={image}/>
                             <Icon inverted name='caret down'/>
                           </Label>
                         }
                  >
                    <Menu className="collapsable" vertical borderless secondary>
                      <Menu.Item style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        {firstName} {lastName}
                        <br/>
                        <Divider/>
                      </Menu.Item>
                      <Menu.Item as={NavLink}
                                 exact to='/profile'
                                 style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        View Profile
                      </Menu.Item>
                      <Menu.Item as={NavLink} onClick={Meteor.logout}
                                 exact to="/#/" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        Log Out
                      </Menu.Item>
                    </Menu>
                  </Popup>
                  {/** Why is this here?
                  <Popup basic
                         className='collapsed'
                         on={'click'}
                         horizontalOffset={15}
                         verticalOffset={-4}
                         style={popupStyle}
                         hideOnScroll
                         trigger={
                           <Button className='collapsed' inverted icon size='medium'
                                   style={{ position: 'relative', bottom: '.65em', backgroundColor: 'white' }}>
                             <Icon name={'bars'}/>
                           </Button>
                         }
                  >
                    <Menu vertical borderless secondary>
                      <Menu.Item style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        {this.props.profile.firstName} {this.props.profile.lastName}
                        <br/>
                        <Divider/>
                      </Menu.Item>

                      <Menu.Item as={NavLink}
                                 exact to='/profile'
                                 style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        View Profile
                      </Menu.Item>

                      <Menu.Item as={NavLink} exact to='/addsession' content={'Create a Session'}
                                 style={{ color: 'rgba(255, 255, 255, 0.9)' }}/>

                      <Menu.Item as={NavLink} exact to='/Calendar' content={'Calendar'}
                                 style={{ color: 'rgba(255, 255, 255, 0.9)' }}/>

                      <Menu.Item as={NavLink} exact to='/Search' content={'Search'}
                                 style={{ color: 'rgba(255, 255, 255, 0.9)' }}/>

                      <Menu.Item as={NavLink} exact to='' content={'Leaderboard'}
                                 style={{ color: 'rgba(255, 255, 255, 0.9)' }}/>

                      {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                          <Menu.Item as={NavLink} exact to="/admin" content={'Admin'}
                                     style={{ color: 'rgba(255, 255, 255, 0.9)' }}/>) : ''
                      }

                      <Menu.Item as={NavLink} onClick={Meteor.logout}
                                 exact to="/#/" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        Log Out
                      </Menu.Item>
                    </Menu>
                  </Popup> */}

                </Menu.Menu>

            ) : ''}
          </Menu>
        </Container>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
  profile: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => {
  const subscription = Meteor.subscribe('Profile');
  return {
    currentUser: Meteor.user() ? Meteor.user().username : '',
    profile: Profiles.find({}).fetch(),
    ready: (subscription.ready()),
  };
})(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
