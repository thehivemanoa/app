import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
        <div>
          {this.props.currentUser === '' ? (
              <Menu pointing secondary>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                    as={NavLink}
                    exact to="/"
                />
                <Menu.Item
                    name='about'
                    active={activeItem === 'about'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='join'
                    active={activeItem === 'join'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='contact'
                    active={activeItem === 'contact'}
                    onClick={this.handleItemClick}
                />
                <Menu.Menu position='right'>
                  {this.props.currentUser === '' ? (
                      <Menu.Item
                          name='Sign in'
                          as={NavLink}
                          exact to="/signin"
                      />
                  ) : (
                      <Dropdown item text={this.props.currentUser}>
                        <Dropdown.Menu>
                          <Dropdown.Item icon='edit' text='Edit Profile' as={NavLink} exact to='/signout'/>
                          <Dropdown.Item icon='sign-out' text='Sign Out' as={NavLink} exact to='/signout'/>
                        </Dropdown.Menu>
                      </Dropdown>
                  )}
                </Menu.Menu>
              </Menu>
          ) : (
              <Menu pointing secondary>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                    as={NavLink}
                    exact to="/"
                />
                <Menu.Menu position='right'>
                  <Dropdown item text={this.props.currentUser}>
                    <Dropdown.Menu>
                      <Dropdown.Item icon='edit' text='Edit Profile' as={NavLink} exact to='/signout'/>
                      <Dropdown.Item icon='sign-out' text='Sign Out' as={NavLink} exact to='/signout'/>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Menu>
              </Menu>
          )}
        </div>
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
