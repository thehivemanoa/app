import React from 'react';
import { List, Divider, Button, Form, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const _ = require('underscore');

export default class FilterCourses extends React.Component {
  render() {
    const colors = {
      'ICS 311': '#E692F8',
      'ICS 314': '#FFB4B0',
    };

    const courses = _.map(
        _.keys(this.props.courses).sort(),
        course => <Button key={course}
                          icon="x"
                          content={<p style={{ marginLeft: '32%' }}>{course}</p>}
                          style={{ backgroundColor: colors[course] }}
                          onClick={() => this.props.deleteCourse(course)} />,
    );

    return (
        <List.Item>
          <Divider horizontal>Courses</Divider>
          <Form onSubmit={() => this.props.addCourse(this.props.course)}>
            <Form.Input placeholder="Add course..."
                        name="course"
                        value={this.props.course}
                        onChange={this.props.handleChange}/>
          </Form>
          <Button.Group vertical labeled icon fluid>
            {courses}
          </Button.Group>
        </List.Item>
    );
  }
}

FilterCourses.propTypes = {
  addCourse: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  course: PropTypes.string.isRequired,
};
