import React from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

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
          <Card.Content extra>
            <Link to={'/'}>Edit</Link>
          </Card.Content>
          <Card.Content extra>
            <Grid>
              <Grid.Row columns={2}>
                <Button fluid color={'green'}>Add</Button>
                <Button fluid color={'red'}>Delete</Button>
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
