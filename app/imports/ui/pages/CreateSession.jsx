import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Loader, Container } from 'semantic-ui-react';
import AddSession from '../components/AddSession';
import { Courses } from '../../api/courses/courses';

class CreateSession extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    console.log(this.props.courses);

    return (
        <Container className="page-container">
          <AddSession courses={this.props.courses}/>
        </Container>
    );
  }
}

CreateSession.propTypes = {
  courses: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Courses');
  return {
    courses: Courses.find({}).fetch(),
    ready: subscription.ready(),
  };
})(CreateSession);
