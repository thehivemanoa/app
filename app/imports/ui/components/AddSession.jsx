import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';
import { Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SelectField from 'uniforms-semantic/SelectField';
import LongTextField from 'uniforms-semantic/LongTextField';
import DateField from 'uniforms-semantic/DateField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Sessions, SessionSchema } from '/imports/api/session/session';


/** Renders the Page for adding a document. */
class AddSession extends React.Component {

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
    const { title, course, description, date, startTime, endTime } = data;
    const owner = Meteor.user().username;
    const attendees = owner;
    Sessions.insert({
      title, course, description, date, startTime, endTime, attendees, owner }, this.insertCallback);
    console.log(date);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <AutoForm ref={(ref) => { this.formRef = ref; }} schema={SessionSchema} onSubmit={this.submit}>
          <Segment>
            <TextField label={'Title'} name={'title'}/>
            <SelectField label={'Course'} name={'course'}
                         allowedValues={this.props.courses.map((object) => object.course)}/>
            <LongTextField label={'Description'} name={'description'}/>
            <DateField label={'Date'} name={'date'}/>
            <DateField label={'Start Time'} name={'startTime'}/>
            <DateField label={'End Time'} name={'endTime'}/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
            <HiddenField name={'attendees'} value={'fakeuser@foo.com'}/>
            <HiddenField name='owner' value={'fakeuser@foo.com'}/>
          </Segment>
        </AutoForm>
    );
  }
}

AddSession.propTypes = {
  courses: PropTypes.array.isRequired,
};

export default AddSession;
