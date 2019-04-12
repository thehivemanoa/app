import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Header, Popup, Icon, Button, Modal, Form, Image } from 'semantic-ui-react';
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
    const menuStyle = {
      borderRadius: '0',
      padding: '5px 25px 5px 25px',
      backgroundColor: '#081B34',
      alignItems: 'baseline',
    };

    const popupStyle = {
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

    return (
        <Menu className="ui borderless top fixed menu" style={menuStyle}>
          <Menu.Item id='toplogo'>
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
                           style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                           position='right'/>

                <Menu.Item as={NavLink} exact to='/addsession' content={'Create a Session'}
                           style={{ color: 'rgba(255, 255, 255, 0.9)' }}/>

                <Menu.Item as={NavLink} exact to='/Calendar' content={'Calendar'}
                           style={{ color: 'rgba(255, 255, 255, 0.9)' }}/>

                <Menu.Item as={NavLink} exact to='' content={'Leaderboard'}
                           style={{ color: 'rgba(255, 255, 255, 0.9)' }}/>

                {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                    <Menu.Item as={NavLink} exact to="/admin" content={'Admin'}
                               style={{ color: 'rgba(255, 255, 255, 0.9)' }}/>
                ) : ''}
                <Menu.Menu>
                  <Menu.Item>
                    <Popup basic
                           on={'click'}
                           horizontalOffset={15}
                           verticalOffset={-4}
                           style={popupStyle}
                           trigger={
                             <Button inverted icon size={'mini'} color={'yellow'}>
                               <Icon name={'bars'}/>
                             </Button>
                           }
                    >
                      <Menu vertical borderless secondary>
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
                  </Menu.Item>
                </Menu.Menu>
              </Menu.Menu>
          ) : ''}
        </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
