import React from 'react';
import Meteor from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Feed, Image, Button, Label, Icon, Popup } from 'semantic-ui-react';
import { ReportLog } from '../../api/reportLog/reportLog';
import { Profiles } from '../../api/profile/profile';
import { withTracker } from 'meteor/react-meteor-data';

/** Renders the Page for adding a document. */
class ReportItem extends React.Component {

  getUser = () => {
    const user = Profiles.find({ owner: this.props.reportItem.target }).fetch()[0];
    console.log(`Got user: ${user}`);
  }

  handleDisregard() {
    ReportLog.remove(this.Id);
  }

  handleBan() {
    /** Meteor.users.remove(this.getUser()._id);
    Profiles.remove(this.getUser()._id); */
    // getUser;
  }


  render() {
    const reason = `Reason: ${this.props.reportItem.description}`;
    return (
        <Feed.Event>
          <Feed.Label>
            <Image circular
                   size={'mini'}
                   src={'https://philipmjohnson.github.io/images/philip2.jpeg'}/>
          </Feed.Label>
          <Feed.Content>
            <Feed.Date content={this.props.reportItem.createdAt.toLocaleDateString('en-US')}/>
            <Feed.Summary>
              <Feed.User>{this.props.reportItem.owner}</Feed.User>
              {' '}reported{' '}
              <Feed.User>{this.props.reportItem.target}</Feed.User><br/>
              {reason}
            </Feed.Summary>
          </Feed.Content>
          <Popup basic
                 className={'collapsable'}
                 on={'click'}
                 hideOnScroll
                 position={'bottom center'}
                 trigger={
                   <Button animated size={'mini'} style={{ height: '30px' }}>
                     <Button.Content visible>Resolve</Button.Content>
                     <Button.Content hidden>
                       <Icon name='arrow right' />
                     </Button.Content>
                   </Button>
                 }
          >
            <Button content={'Disregard'} onClick={this.handleDisregard}/>
            <Button negative content={'Ban'} onClick={this.getUser}/>
          </Popup>
        </Feed.Event>
    );
  }
}

ReportItem.propTypes = {
  reportItem: PropTypes.object.isRequired,
};

export default withTracker(() => {
  // Get access to Profile documents.
  const profileSub = Meteor.subscribe('Profiles');

  return {
    profiles: Profiles.find({}, { sort: { exp: -1 } }).fetch(),
    ready: (
        profileSub.ready()
    ),
  };
})(ReportItem);
