import React from 'react';
import PropTypes from 'prop-types';
import { Feed, Image } from 'semantic-ui-react';

/** Renders the Page for adding a document. */
class ActivityItem extends React.Component {

  render() {
    return (
        <Feed.Event>
          <Feed.Label>
            <Image circular
                   size={'mini'}
                   src={'https://philipmjohnson.github.io/images/philip2.jpeg'}/>
          </Feed.Label>
          <Feed.Content>
            <Feed.Date content={this.props.activityItem.createdAt.toLocaleDateString('en-US')} />
            <Feed.Summary>
              <Feed.User>{this.props.activityItem.owner}</Feed.User>
              {' '}{this.props.activityItem.event}{' '}
              <Feed.User>{this.props.activityItem.target}</Feed.User>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
    );
  }
}

ActivityItem.propTypes = {
  activityItem: PropTypes.object.isRequired,
};

export default ActivityItem;
