import React from 'react';
import { Sessions, SessionSchema } from '/imports/api/session/session';
import { Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import DateField from 'uniforms-semantic/DateField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

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
    const { title, course, description, date, startTime, endTime, attendees } = data;
    const owner = Meteor.user().username;
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
            <TextField label={'Course'} name={'course'}/>
            <TextField label={'Description'} name={'description'}/>
            <DateField label={'Date'} name={'date'}/>
            <TextField label={'Start Time'} name={'startTime'}/>
            <TextField label={'End Time'} name={'endTime'}/>
            <TextField label={'Attendees'} name={'attendees'}/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
            <HiddenField name='owner' value={'fakeuser@foo.com'}/>
          </Segment>
        </AutoForm>
    );
  }
}

export default AddSession;
