import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Header, Dropdown, Grid } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = {
      marginBottom: '10px',
      background: 'radial-gradient(circle closest-corner, yellow, #f06d06)',
    };

    const titleStyle = {
      color: '#020202',
      fontFamily: 'Bubblegum Sans',
    };

    return (
        <div>
          {this.props.currentUser === '' ? (
              <div style={menuStyle}>
                <Grid columns='equal' padded>
                  <Grid.Row>
                    <Grid.Column/>
                    <Grid.Column textAlign='center'>
                      <Header style={titleStyle} as='h1'>WAGGLE</Header>
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                      {this.props.currentUser === '' ? (
                          <Dropdown text="Login" pointing="top right" icon={'user'}>
                            <Dropdown.Menu>
                              <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                            </Dropdown.Menu>
                          </Dropdown>
                      ) : (
                          <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
                            <Dropdown.Menu>
                              <Dropdown.Item icon="settings" text="Edit Profile" as={NavLink} exact to="/signout"/>
                              <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                            </Dropdown.Menu>
                          </Dropdown>
                      )}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
          ) : (
              <div style={menuStyle}>
                <Grid columns='equal'>
                  <Grid.Row>
                    <Grid.Column textAlign='left'>
                      <Header style={titleStyle} as='h1'>WAGGLE</Header>
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                      <Grid columns='equal'>
                        <Grid.Row textAlign='center'>
                          <Grid.Column>
                            <Header>STUFF</Header>
                          </Grid.Column>
                          <Grid.Column>
                            <Header>STUFF</Header>
                          </Grid.Column>
                          <Grid.Column>
                            <Header>STUFF</Header>
                          </Grid.Column>
                          <Grid.Column>
                            <Header>STUFF</Header>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                      {this.props.currentUser === '' ? (
                          <Dropdown text="Login" pointing="top right" icon={'user'}>
                            <Dropdown.Menu>
                              <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                            </Dropdown.Menu>
                          </Dropdown>
                      ) : (
                          <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
                            <Dropdown.Menu>
                              <Dropdown.Item icon="settings" text="Edit Profile" as={NavLink} exact to="/signout"/>
                              <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                            </Dropdown.Menu>
                          </Dropdown>
                      )}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
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
