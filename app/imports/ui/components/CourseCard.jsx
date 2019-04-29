import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'semantic-ui-react';

export default class CourseCard extends React.Component {
  render() {

    return (
        <Card fluid>
          <Card.Content>
            <Card.Header>{this.props.course.course}</Card.Header>
            <Card.Description>{this.props.course.description}</Card.Description>
          </Card.Content>
          {this.props.admin ? (
                <Card.Content extra>
                  <Button basic>
                    Edit
                  </Button>
                  <Button basic color={'red'}>
                    Delete
                  </Button>
                </Card.Content>
          ) : ''}
        </Card>
    );
  }
}

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
  admin: PropTypes.bool.isRequired,
};
