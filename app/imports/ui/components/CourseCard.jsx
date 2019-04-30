import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { Meteor } from 'meteor/meteor';
import { Card, Button, Modal, Form, Container } from 'semantic-ui-react';
import { Courses } from '/imports/api/courses/courses';
import { Profiles } from '/imports/api/profile/profile';
import { withTracker } from 'meteor/react-meteor-data';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

const _ = require('underscore');

class CourseCard extends React.Component {
  constructor(props) {
    super(props);
    this.refreshPage = this.refreshPage.bind(this);
    this.renderCard = this.renderCard.bind(this);
    this.editCourse = this.editCourse.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.updateState = this.updateState.bind(this);
    this.initializeState = this.initializeState.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.handleWorker = this.handleWorker.bind(this);
    this.handleRoyal = this.handleRoyal.bind(this);
    this.state = {
      data: {},
      course: '',
      description: '',
      submittedDescription: '',
      workerBee: undefined,
      royalBee: undefined,
      initialWorker: undefined,
      initialRoyal: undefined,
      initialStatus: undefined,
      changed: false,
      modalOpen: false,
      ready: false,
    };
  }

  refreshPage() {
    if (this.state.initialRoyal === undefined && this.state.initialWorker === undefined) {
      if (this.state.initialRoyal !== this.state.royalBee && this.state.initialWorker !== this.state.workerBee) {
        const user = Profiles.find({}).fetch()[0];
        Profiles.update(user._id, { $set: { [`courses.${this.props.course}`]: this.state.royalBee } },
            (error) => (error ?
                Alert.error(`Update failed: ${error.message}`, {
                  effect: 'slide',
                }) :
                Alert.success('Update succeeded', {
                  effect: 'slide',
                })));
        document.location.reload(true);
      }
    } else
      if (this.state.royalBee !== undefined || this.state.workerBee !== undefined) {
        if (!this.state.royalBee && !this.state.workerBee) {
          const user = Profiles.find({}).fetch()[0];
          Profiles.update(user._id, { $unset: { [`courses.${this.props.course}`]: '' } },
              (error) => (error ?
                  Alert.error(`Update failed: ${error.message}`, {
                    effect: 'slide',
                  }) :
                  Alert.success('Update succeeded', {
                    effect: 'slide',
                  })));
          document.location.reload(true);
        }
        if (this.state.initialRoyal !== this.state.royalBee && this.state.initialWorker !== this.state.workerBee) {
          const user = Profiles.find({}).fetch()[0];
          Profiles.update(user._id, { $set: { [`courses.${this.props.course}`]: this.state.royalBee } },
              (error) => (error ?
                  Alert.error(`Update failed: ${error.message}`, {
                    effect: 'slide',
                  }) :
                  Alert.success('Update succeeded', {
                    effect: 'slide',
                  })));
          document.location.reload(true);
        }
      }
  }

  initializeState() {
    const data = Courses.find({ course: this.props.course }).fetch()[0];
    const courses = Profiles.find({}).fetch()[0].courses;
    const course = _.pick(courses, this.props.course);
    const value = _.values(course)[0];
    console.log(value);
    this.setState({
      data: data,
      course: data.course,
      description: data.description,
      submittedDescription: data.description,
    });
    if (value === undefined) {
      this.setState({
        workerBee: false,
        royalBee: false,
        initialRoyal: undefined,
        initialWorker: undefined,
      });
    } else
      if (value) {
        this.setState({
          royalBee: true,
          initialRoyal: true,
          workerBee: false,
          initialWorker: false,
        });
      } else {
        this.setState({
          workerBee: true,
          initialWorker: true,
          royalBee: false,
          initialRoyal: false,
        });
      }
  }

  editCourse() {
    const data = Courses.find({ course: this.props.course }).fetch()[0];
    const { description } = this.state;
    this.setState({
      submittedDescription: description,
    });
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
    const data = Courses.find({ course: this.props.course }).fetch()[0];
    Courses.remove(data._id,
        (error) => (error ?
            Alert.error(`Remove failed: ${error.message}`, {
              effect: 'slide',
            }) :
            Alert.success('Remove succeeded', {
              effect: 'slide',
            })));
    this.setState({
      modalOpen: false,
    });
    document.location.reload(true);
  }

  removeCard() {
    const user = Profiles.find({}).fetch()[0];
    Profiles.update(user._id, { $unset: { [`courses.${this.props.course}`]: '' } },
        (error) => (error ?
            Alert.error(`Update failed: ${error.message}`, {
              effect: 'slide',
            }) :
            Alert.success('Update succeeded', {
              effect: 'slide',
            })));
    document.location.reload(true);
  }

  updateState(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleWorker() {
    this.setState({ workerBee: !this.state.workerBee, royalBee: false });
    if (this.state.initialWorker === undefined && this.state.workerBee) {
      this.setState({ workerBee: undefined });
    }
  }

  handleRoyal() {
    this.setState({ royalBee: !this.state.royalBee, workerBee: false });
    if (this.state.initialRoyal === undefined && this.state.royalBee) {
      this.setState({ royalBee: undefined });
    }
  }

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
          } onUnmount={this.refreshPage}>
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
                  <Button basic color={'red'} onClick={this.deleteCourse}>
                    Delete
                  </Button>
                </Modal.Content>
            ) : (
                <Modal.Content>
                  <Button basic color={'red'} onClick={this.removeCard}>
                    Delete
                  </Button>
                  <Button.Group floated={'right'} size={'small'}>
                    <Button toggle basic active={this.state.workerBee} onClick={this.handleWorker}>
                      Worker
                    </Button>
                    <Button toggle basic active={this.state.royalBee} onClick={this.handleRoyal}>
                      Royal
                    </Button>
                  </Button.Group>
                </Modal.Content>
            )}
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
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Profile');
  return {
    ready: (subscription.ready()),
  };
})(CourseCard);
