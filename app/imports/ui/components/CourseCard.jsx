import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class CourseCard extends React.Component {
  render() {

    return (
        <Card centered>
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
