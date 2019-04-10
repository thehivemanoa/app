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
                <Header as={'h2'}>What is Waggle?</Header>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae augue eget augue dignissim
                  porta id vel lorem. Integer et lacus tempor, lacinia magna vehicula, gravida ante. Nulla facilisi.
                  Curabitur semper, elit sed dignissim vehicula, mi velit viverra orci, id tristique erat tellus ac
                  ligula. Praesent vehicula sodales nisl. Duis sed magna nisi. Morbi eleifend a velit ac luctus.
                  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
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
                <Header as={'h2'}>Schedule a session</Header>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae augue eget augue dignissim
                  porta id vel lorem. Integer et lacus tempor, lacinia magna vehicula, gravida ante. Nulla facilisi.
                  Curabitur semper, elit sed dignissim vehicula, mi velit viverra orci, id tristique erat tellus ac
                  ligula. Praesent vehicula sodales nisl. Duis sed magna nisi. Morbi eleifend a velit ac luctus.
                  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
                </p>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className="white-bg">
              <Grid.Column width={5}>
                <Header as={'h2'}>Discover new study sessions and plan ahead</Header>
                <p>
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
                <Header as={'h2'} style={{ color: 'white' }}>Move up the leaderboard</Header>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae augue eget augue dignissim
                  porta id vel lorem. Integer et lacus tempor, lacinia magna vehicula, gravida ante. Nulla facilisi.
                  Curabitur semper, elit sed dignissim vehicula, mi velit viverra orci, id tristique erat tellus ac
                  ligula. Praesent vehicula sodales nisl. Duis sed magna nisi. Morbi eleifend a velit ac luctus.
                  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

export default Landing;
