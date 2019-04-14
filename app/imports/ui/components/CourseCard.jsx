import React from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Courses } from '../../api/courses/courses';
import sAlert from 'react-s-alert';

class CourseCard extends React.Component {

  /** Bind 'this' so that we can access this.props in onClick. */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  deleteCallback(error) {
    if (error) {
      sAlert.error(`Delete failed: ${error.message}`, {
        position: 'top-right',
        effect: 'slide',
        html: 'false'
      });
    } else {
      sAlert.success('Delete succeeded', {
        position: 'top-right',
        effect: 'slide',
        html: 'false'
      });
    }
  }

  /** When the delete button is clicked, remove the corresponding item from the collection. */
  onClick() {
    Courses.remove(this.props.course._id, this.deleteCallback);
  }

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
          <Card.Content extra>
            <Grid>
              <Grid.Row columns={2}>
                <Button fluid color={'green'}>Add</Button> /* Not sure if this is needed in Course Card */
                <Button color={'red'} onClick={this.onClick}>Delete</Button>
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
    );
  }
}

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
};

export default withRouter(CourseCard);
