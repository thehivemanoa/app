import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center'>

          <Grid.Row style={{ backgroundColor: '#081B34', padding: '56px 168px' }}>
            <Header style={{ color: 'white' }}>Register Account</Header>
            <Button style={{ backgroundColor: '#FAA952' }}>REGISTER NOW</Button>
          </Grid.Row>

          <Grid.Row columns={2} style={{ backgroundColor: 'white', padding: '56px' }}>
            <Grid.Column width={5}>
              <Header>What is Waggle?</Header>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae augue eget augue dignissim
              porta id vel lorem. Integer et lacus tempor, lacinia magna vehicula, gravida ante. Nulla facilisi.
              Curabitur semper, elit sed dignissim vehicula, mi velit viverra orci, id tristique erat tellus ac ligula.
              Praesent vehicula sodales nisl. Duis sed magna nisi. Morbi eleifend a velit ac luctus. Vestibulum ante
              ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;</p>
            </Grid.Column>
            <Grid.Column width={7}>
              <Image src={'https://semantic-ui.com/images/wireframe/image.png'} style={{ width: '500px' }}/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row style={{ backgroundColor: 'yellow', padding: '56px 168px' }}>
            <Header>Schedule a session</Header>
          </Grid.Row>

          <Grid.Row style={{ backgroundColor: 'white', padding: '56px 168px' }}>
            <Header>Calendar</Header>
          </Grid.Row>

          <Grid.Row style={{ backgroundColor: 'black', padding: '56px 168px' }}>
            <Header style={{ color: 'white' }}>Move up the leaderboard</Header>
          </Grid.Row>

        </Grid>
    );
  }
}

export default Landing;
