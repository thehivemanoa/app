import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { Card, Button, Modal, Form, Container } from 'semantic-ui-react';
import { Courses } from '/imports/api/courses/courses';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

export default class CourseCard extends React.Component {
  constructor(props) {
    super(props);
    this.renderCard = this.renderCard.bind(this);
    this.editCourse = this.editCourse.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.updateState = this.updateState.bind(this);
    this.initializeState = this.initializeState.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.state = {
      data: {},
      course: '',
      description: '',
      submittedDescription: '',
      modalOpen: false,
      ready: false,
    };
  }

  initializeState() {
    const data = Courses.find({ course: this.props.course }).fetch()[0];
    this.setState({
      data: data,
      course: data.course,
      description: data.description,
      submittedDescription: data.description,
    });
  }

  editCourse() {
    const data = Courses.find({ course: this.props.course }).fetch()[0];
    const { description } = this.state;
    this.setState({
      submittedDescription: description,
    });
    console.log(data._id);
    Courses.update(data._id, { $set: { description } },
        (error) => (error ?
            Alert.error(`Update failed: ${error.message}`, {
              effect: 'slide',
            }) :
            Alert.success('Update succeeded', {
              effect: 'slide',
            })));
    this.setState({
      modalOpen: false,
    });
  }

  deleteCourse() {

  }

  updateState(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleOpen = () => this.setState({ modalOpen: true });

  renderCard() {
    const isUndefined = this.state.data === undefined;
    const { description } = this.state;
    if (isUndefined) {
      console.log(`Course ${this.props.course} is undefined`);
      return '';
    }
    return (
        <div>
          <Modal trigger={
            <Card fluid>
              <Card.Content>
                <Card.Header>{this.state.course}</Card.Header>
              </Card.Content>
            </Card>
          }>
            <Modal.Header>{this.state.course}</Modal.Header>
            <Modal.Content>{this.state.submittedDescription}</Modal.Content>
            {this.props.admin ? (
                <Modal.Content>
                  <Modal trigger={<Button basic onClick={this.handleOpen}>Edit</Button>} open={this.state.modalOpen}>
                    <Modal.Header>Editing {this.state.course}</Modal.Header>
                    <Modal.Content>
                      <Container>
                        <Form onSubmit={this.editCourse}>
                          <Form.TextArea label={'Description'} name={'description'}
                                         value={description} onChange={this.updateState}/>
                          <Form.Button content={'Submit'} basic color={'green'}/>
                        </Form>
                      </Container>
                    </Modal.Content>
                  </Modal>
                  <Button basic color={'red'}>
                    Delete
                  </Button>
                </Modal.Content>
            ) : ''}
          </Modal>
        </div>
    );
  }

  render() {
    if (!this.state.ready) {
      this.initializeState();
      this.setState({
        ready: true,
      });
    }
    return (
        this.renderCard()
    );
  }
}

CourseCard.propTypes = {
  course: PropTypes.string.isRequired,
  admin: PropTypes.bool.isRequired,
};
