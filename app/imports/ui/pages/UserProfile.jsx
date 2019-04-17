import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Grid, Card, Image, Icon, Progress, Tab } from 'semantic-ui-react';
import ProfileCard from '../components/ProfileCard';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const panes = [
      {
        menuItem: 'Information',
        pane: (
            <Tab.Pane attached={false} key={'Information'}>
              <p>First Name: {this.props.firstName}</p>
              <p>Last Name: {this.props.lastName}</p>
              <p>Email: {this.props.email}</p>
            </Tab.Pane>
        ),
      },
      {
        menuItem: 'Courses',
        pane: (
            <Tab.Pane attached={false} key={'Courses'}>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque dolore dolores, eveniet
                facilis in itaque maxime, nihil optio, quia quo recusandae reprehenderit totam. Aperiam excepturi illo
                inventore nemo nobis perspiciatis repellat vitae. At corporis iure magnam natus qui tempora, veritatis
                vitae voluptate. Beatae explicabo fugit similique suscipit voluptatem! A asperiores commodi consectetur
                cupiditate delectus dicta dolor ea eius eligendi facilis fugiat illo impedit labore libero magni minus
                non numquam obcaecati officia omnis possimus quisquam rem repellendus soluta suscipit, tenetur totam
                ullam unde ut vitae! A, assumenda, deleniti dicta eligendi maxime nesciunt nihil odio officia omnis quam
                repellat, rerum soluta.</p>
            </Tab.Pane>
        ),
      },
      {
        menuItem: 'Notifications',
        pane: (
            <Tab.Pane attached={false} key={'Notifications'}>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores, laudantium libero minima
                soluta tempora! Accusamus adipisci, blanditiis commodi culpa cum cupiditate dolor ea error esse
                explicabo fuga ipsum labore minima minus obcaecati officia praesentium, quae quos ratione reiciendis
                saepe sit tempora ullam unde voluptatum? Accusamus animi asperiores at cupiditate eius fugiat harum
                ipsa, laborum minima neque nisi officia perferendis perspiciatis, quaerat ratione repellendus, suscipit.
                A est iusto magnam perspiciatis placeat quas quasi quod reiciendis rerum saepe. A alias aliquam
                aspernatur atque corporis dignissimos enim et explicabo laboriosam maiores molestias natus nemo nisi,
                officiis quia ratione rerum vel voluptatibus? Ea!</p>
            </Tab.Pane>),
      }
    ];

    const containerPadding = {
      paddingTop: 20,
      paddingBottom: 30,
      paddingLeft: 50,
      paddingRight: 50,
      minHeight: '70vh',
    };

    return (
        <Container className="profile-page" style={containerPadding} fluid>
          <ProfileCard
              firstName={this.props.firstName}
              lastName={this.props.lastName}
              level={this.props.level}
              exp={this.props.exp}
              image={this.props.image}
          />
          <Tab menu={{ secondary: true, pointing: true, fluid: true, vertical: true }} menuPosition={'right'}
               panes={panes}
               renderActiveOnly={false}/>
        </Container>
    )
        ;
  }
}

/** Require an array of Stuff documents in the props. */
UserProfile.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  level: PropTypes.string,
  exp: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.string
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Courses');
  return {
    firstName: Meteor.user() ? Meteor.user().profile.firstName : '',
    lastName: Meteor.user() ? Meteor.user().profile.lastName : '',
    level: Meteor.user() ? Meteor.user().profile.level : '',
    exp: Meteor.user() ? Meteor.user().profile.exp : '',
    email: Meteor.user() ? Meteor.user().username : '',
    image: Meteor.user() ? Meteor.user().profile.image : '',
    ready: subscription.ready(),
  };
})(UserProfile);