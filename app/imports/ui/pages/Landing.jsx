import React from 'react';
import '../../../client/style.css';
import { Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const message = {
      marginTop: '20px'
    };

    return (
        <div>
          <div className="backgroundImage">
            <div className="landingText">
              <div className="landingBorder">
                WAGGLE
              </div>
            </div>
          </div>

          <div style={message}>
            <Grid verticalAlign='middle' textAlign='center' container>
              <Grid.Column width={4}>
                Logo Here
              </Grid.Column>

              <Grid.Column width={8}>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam dignissimos ducimus fuga illo
                  impedit iure nesciunt odio quis. Accusamus consequatur corporis dignissimos dolor, dolores eius
                  facere,
                  ipsam itaque, libero pariatur placeat possimus quidem quisquam quod recusandae rem voluptates. Aperiam
                  assumenda atque commodi earum in minus odit perferendis provident voluptas! Cum dignissimos eligendi
                  harum
                  ipsa laboriosam magnam nihil suscipit tenetur vero voluptates? Commodi cumque debitis deleniti
                  doloremque
                  doloribus exercitationem expedita facilis fugit illo impedit inventore laboriosam laborum, libero
                  minus,
                  mollitia nisi porro possimus quae quam quasi quia ratione recusandae, tempore temporibus tenetur ut
                  vero
                  vitae! A at autem esse repellendus.</p>
              </Grid.Column>
            </Grid>
          </div>
        </div>
    );
  }
}

export default Landing;
