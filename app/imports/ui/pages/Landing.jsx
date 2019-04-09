import React from 'react';
import { Grid, Image, Header, Segment, Form } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center'>
          <Grid.Row style={{ backgroundColor: '#081B34', padding: '56px 168px' }}>
            <Grid.Column width={9}>
              <Image src={'https://semantic-ui.com/images/wireframe/image.png'} style={{ width: '500px' }}/>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header as={'h2'} textAlign="center" style={{ color: 'white' }}>
                Register your account
              </Header>
              <Form onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                      label="Email"
                      icon="user"
                      iconPosition="left"
                      name="email"
                      type="email"
                      placeholder="E-mail address"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Password"
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      placeholder="Password"
                      type="password"
                      onChange={this.handleChange}
                  />
                  <Form.Button content="Submit" style={{ backgroundColor: '#FAA952' }}/>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2} style={{ backgroundColor: 'white', padding: '56px' }}>
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

          <Grid.Row style={{ backgroundColor: 'yellow', padding: '56px 168px' }}>
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

          <Grid.Row style={{ backgroundColor: 'white', padding: '56px 168px' }}>
            <Grid.Column width={5}>
              <Header as={'h2'}>Discover new study sessions and plan ahead</Header>
              <p>
                Waggle’s built-in calendar manages to be detailed without being overcrowded, making it easy to browse
                new
                study sessions. Read through the descriptions and look over an exhaustive list of the attendees to find
                out which sessions work for you. Once you’ve made a decision, you can join or leave with the click of a
                button.
              </p>
            </Grid.Column>
            <Grid.Column width={7}>
              <Image src={'../images/calendar-page-v1.PNG'} style={{ width: '500px' }}/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row style={{ backgroundColor: 'black', padding: '56px 168px' }}>
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
    );
  }
}

export default Landing;
