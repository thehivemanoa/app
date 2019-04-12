import React from 'react';
import PropTypes from 'prop-types';
import { Card, Header, List, Grid, Button, Icon } from 'semantic-ui-react';
import dateFns from 'date-fns';

export default class CourseCard extends React.Component {
  render() {
    const colors = {
      'ICS 311': '#E692F8',
      'ICS 314': '#FFB4B0',
    };
    const headerRowStyle = {
      padding: '0px',
      height: '40px',
    };
    const headerColumnStyle = {
      backgroundColor: colors[this.props.course.course],
      verticalAlign: 'middle',
      height: '100%',
      padding: '10px',
      // position: 'relative',
    };
    const headerStyle = {
      // position: 'absolute',
      // top: '50%',
      // left: '50%',
      // transform: 'translate(-50%,-50%)',
      // textAlign: 'left',
    };
    const headerButtonStyle = {
      position: 'absolute',
      top: '50%',
      left: '55%',
      transform: 'translate(-50%,-50%)',
      backgroundColor: 'white',
      color: 'black',
      height: '25px',
      width: '90px',
      verticalAlign: 'middle',
      textAlign: 'center',
      padding: 0,
    };

    return (
        <Card fluid>
          <Card.Content>
            <Grid>
              <Grid.Row style={headerRowStyle}>
                <Grid.Column width={10} style={headerColumnStyle}>
                  <Header as="h5" style={headerStyle}>{this.props.course.title}</Header>
                </Grid.Column>
                <Grid.Column width={6} style={headerColumnStyle}>
                  <Button style={headerButtonStyle}>Edit</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid>
              <Grid.Row centered columns="equal" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                <Grid.Column>
                  <p> Bee Status </p>
                </Grid.Column>
                <Grid.Column width={1}><Icon name="user times"/></Grid.Column>
                <Grid.Column width={1}>1</Grid.Column>
                <Grid.Column width={1}><Icon name="user times"/></Grid.Column>
                <Grid.Column width={1}>0</Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
    );
  }
}

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
};
