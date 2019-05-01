import React from 'react';
import Alert from 'react-s-alert';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import CalendarPage from '../pages/CalendarPage';
import CreateSession from '../pages/CreateSession';
import UserProfile from '../pages/UserProfile';
import Landing from '../pages/Landing';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Admin from '../pages/Admin';
import SearchPage from '../pages/SearchPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <span>
              <NavBar/>
              <Switch>
                <Route exact path="/" component={Landing}/>
                <Route path="/signin" component={Signin}/>
                <Route path="/signup" component={Signup}/>
                <ProtectedRoute path="/Calendar" component={CalendarPage}/>
                <ProtectedRoute path="/addsession" component={CreateSession}/>
                <ProtectedRoute path="/profile" component={UserProfile}/>
                <ProtectedRoute path="/Search" component={SearchPage}/>
                <ProtectedRoute path="/leaderboard" component={LeaderboardPage}/>
                <AdminProtectedRoute path="/admin" component={Admin}/>
                <ProtectedRoute path="/signout" component={Signout}/>
                <Route component={NotFound}/>
              </Switch>
              <Footer/>
            </span>
            <Alert stack={true} position={'top-right'} timeout={1000} />
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;
