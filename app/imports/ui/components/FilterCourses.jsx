import React from 'react';
import { List, Divider, Button, Form, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const _ = require('underscore');

export default class FilterCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, { name, value }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const colors = {
      'ICS 311': '#E692F8',
      'ICS 314': '#FFB4B0',
    };

    const courses = _.map(
        _.keys(this.props.courses),
        course => <Button key={course}
                          icon="x"
                          content={<p style={{ marginLeft: '27%' }}>{course}</p>}
                          style={{ backgroundColor: colors[course] }}
                          onClick={() => this.props.deleteCourse(course)} />,
    );

    return (
        <List.Item>
          <Divider horizontal>Courses</Divider>
          <Form onSubmit={() => this.props.addCourse(this.state.course)}>
            <Form.Input placeholder="Add courses..."
                        name="course"
                        value={this.state.course}
                        onChange={this.handleChange}/>
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
};
