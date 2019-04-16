import React from 'react';
import PropTypes from 'prop-types';
import { Feed, Image } from 'semantic-ui-react';

/** Renders the Page for adding a document. */
class Notification extends React.Component {

  render() {
    return (
        <Feed.Event>
          <Feed.Label>
            <Image circular
                   size={'mini'}
                   src={'https://philipmjohnson.github.io/images/philip2.jpeg'}/>
          </Feed.Label>
          <Feed.Content>
            <Feed.Date content='1 day ago' />
            <Feed.Summary>
              You added <a>Jenny Hess</a> to your <a>coworker</a> group.
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
    );
  }
}

Notification.propTypes = {
  courses: PropTypes.array,
};

export default Notification;
