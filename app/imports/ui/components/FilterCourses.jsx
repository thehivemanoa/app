import React from 'react';
import { List, Divider, Button, Form, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const _ = require('underscore');

export default class FilterCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed() {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });
  }

  render() {
    const colors = {
      'ICS 311': '#E692F8',
      'ICS 314': '#FFB4B0',
    };
    const style = {
      marginTop: '5px',
      marginBottom: '25px',
    };
    if (this.props.courseCollapse) {
      style.display = 'none';
    }
    const courses = _.map(
        _.keys(this.props.courses).sort(),
        course => <Button key={course}
                          icon="x"
                          content={<p style={{ marginLeft: '32%' }}>{course}</p>}
                          style={{ backgroundColor: colors[course] }}
                          onClick={() => this.props.deleteCourse(course)} />,
    );

    return (
        <List style={{ paddingLeft: '21px', paddingRight: '21px', marginTop: '4px', marginBottom: '4px' }}>
          <List.Item>
            <Header as="h4" style={{ display: 'inline-block', lineHeight: '35px' }}>Course</Header>
            <Button
                icon={this.props.courseCollapse ? 'plus' : 'minus'}
                floated="right"
                style={{
                  backgroundColor: 'Transparent',
                  paddingRight: 0,
                  margin: 0,
                  display: 'none',
                }}
                onClick={this.props.toggleCollapse}
            />
          </List.Item>
          <List.Item style={style}>
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
        </List>
    );
  }
}

FilterCourses.propTypes = {
  toggleCollapse: PropTypes.func.isRequired,
  courseCollapse: PropTypes.bool.isRequired,
  addCourse: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  courses: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  course: PropTypes.string.isRequired,
};
