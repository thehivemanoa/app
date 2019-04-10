import React from 'react';
import { Grid, Image, Header, Divider, Input, Form, Button, Checkbox, Container, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className="landing-page">
          <div className='blue-bg'>
            <Container>
              <Grid columns={2} divided>
                <Grid.Column>
                  <div className="ui center aligned container">
                    <Image src='/images/landing-bees.png'/>
                  </div>
                </Grid.Column>

                <Grid.Column>
                  <h2><Icon id="triangle-icon" fitted name='triangle right'/> Register Now!</h2>
                  <Form id='registration-form' inverted>
                    <Form.Field>
                      <label>First Name</label>
                      <Input fluid transparent placeholder='First Name'/>
                    </Form.Field>
                    <Divider inverted/>

                    <Form.Field>
                      <label>Last Name</label>
                      <Input fluid transparent placeholder='Last Name'/>
                    </Form.Field>
                    <Divider inverted/>

                    <Form.Field>
                      <label>email</label>
                      <Input fluid transparent placeholder='example@email.com'/>
                    </Form.Field>
                    <Divider inverted/>

                    <Form.Field>
                      <label>Password</label>
                      <Input fluid transparent placeholder='Password'/>
                    </Form.Field>
                    <Divider/>

                    <Form.Field>
                      <Checkbox label='I agree to the Terms and Conditions'/>
                    </Form.Field>
                    <Button id='register-button' type='submit'>Submit</Button>
                  </Form>
                </Grid.Column>
              </Grid>
            </Container>
          </div>

          <Grid verticalAlign='middle' textAlign='center' style={{ marginTop: '0' }}>
            <Grid.Row columns={2} className="white-bg">
              <Grid.Column width={5}>
                <Header as={'landing-header'}>What is Waggle?</Header>
                <p className="landing-text">
                  Waggle provides ICS students of UH Manoa  a platform to easily organize in-person study groups for their classes, or help other students with coursework and projects.
                </p>
              </Grid.Column>
              <Grid.Column width={7}>
                <Image src={'https://semantic-ui.com/images/wireframe/image.png'} style={{ width: '500px' }}/>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className="yellow-bg">
              <Grid.Column width={7}>
                <Image src={'https://semantic-ui.com/images/wireframe/image.png'} style={{ width: '500px' }}/>
              </Grid.Column>
              <Grid.Column width={5}>
                <Header as={'landing-header'}>Schedule a session</Header>
                <p className="landing-text">
                  Start a study session for other bees to join!<br/>Just choose a time and place and the course you want to study for.
                </p>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className="white-bg">
              <Grid.Column width={5}>
                <Header as={'landing-header'}>Discover new study sessions and plan ahead</Header>
                <p className="landing-text">
                  Waggle’s built-in calendar manages to be detailed without being overcrowded, making it easy to browse
                  new
                  study sessions. Read through the descriptions and look over an exhaustive list of the attendees to
                  find
                  out which sessions work for you. Once you’ve made a decision, you can join or leave with the click of
                  a
                  button.
                </p>
              </Grid.Column>
              <Grid.Column width={7}>
                <Image src={'../images/calendar-page-v1.PNG'} style={{ width: '500px' }}/>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className="black-bg">
              <Grid.Column width={7}>
                <Image src={'https://semantic-ui.com/images/wireframe/image.png'} style={{ width: '500px' }}/>
              </Grid.Column>
              <Grid.Column width={5}>
                <Header as={'landing-header'} style={{ color: 'white' }}>Move up the leaderboard</Header>
                <p className="landing-text">
                  The more you Waggle, the more honey you collect!<br/>Join and create study sessions to level up and move up the leaderboard!
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

export default Landing;
