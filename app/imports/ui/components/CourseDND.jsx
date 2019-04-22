import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Container, Header, Card } from 'semantic-ui-react';
import CourseCard from './CourseCard';

export default class CourseDND extends React.Component {
  render() {
    const tableStyle = {
      margin: '8px',
      paddingTop: '8px',
      border: '1px solid lightgrey',
      borderRadius: '2px',
    };

    const titleStyle = {
      padding: '8px',
    };

    const itemStyle = {
      padding: '8px',
    };

    return (
        <Container style={tableStyle}>
          <Header as={'h3'} style={titleStyle} textAlign={'center'}>{this.props.tableId}</Header>
          <Card.Group style={itemStyle}>
            {this.props.courses.map((course, index) => <CourseCard key={index} course={course}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of user documents in the props. */
CourseDND.propTypes = {
  tableId: PropTypes.string,
  courses: PropTypes.array,
  userCourses: PropTypes.object,
};
