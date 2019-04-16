import React from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import { Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Courses, CourseSchema } from '/imports/api/courses/courses';

class AddCourse extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({
        type: 'danger',
        message: `Add failed: ${error.message}`,
      });
    } else {
      Bert.alert({
        type: 'success',
        message: 'Add succeeded',
      });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { course, description } = data;
    Courses.insert({ course, description }, this.insertCallback);
  }

  render() {
    return (
        <AutoForm ref={(ref) => { this.formRef = ref; }} schema={CourseSchema} onSubmit={this.submit}>
          <Segment>
            <TextField label={'Course Name'} name={'course'}/>
            <LongTextField label={'Description'} name={'description'}/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
          </Segment>
        </AutoForm>
    );
  }
}

export default AddCourse;
