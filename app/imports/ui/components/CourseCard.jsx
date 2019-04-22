import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Courses } from '../../api/courses/courses';
import Alert from 'react-s-alert';

class CourseCard extends React.Component {

  /** Bind 'this' so that we can access this.props in onClick. */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  deleteCallback(error) {
    if (error) {
      Alert.error('Delete failed:' + `${error.message}`, {
        effect: 'slide',
      });
    } else {
      Alert.success('Delete succeeded', {
        effect: 'slide',
      });
    }
  }

  /** When the delete button is clicked, remove the corresponding item from the collection. */
  onClick() {
    Courses.remove(this.props.course._id, this.deleteCallback);
  }

  render() {
    return (
        <Card>
          <Card.Content>
            <Card.Header>
              {this.props.course.course}
            </Card.Header>
            <Card.Description>
              {this.props.course.description}
            </Card.Description>
          </Card.Content>
        </Card>
    );
  }
}

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
};

export default withRouter(CourseCard);
