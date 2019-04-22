import React from 'react';
import PropTypes from 'prop-types';
import { Feed, Image } from 'semantic-ui-react';

/** Renders the Page for adding a document. */
class TaskItem extends React.Component {

  render() {
    return (
        <Feed.Event>
          <Feed.Label>
            <Image circular
                   size={'mini'}
                   src={'https://philipmjohnson.github.io/images/philip2.jpeg'}/>
          </Feed.Label>
          <Feed.Content>
            <Feed.Date content={this.props.taskItem.createdAt.toLocaleDateString('en-US')} />
            <Feed.Summary>{this.props.taskItem.task}</Feed.Summary>
          </Feed.Content>
        </Feed.Event>
    );
  }
}

TaskItem.propTypes = {
  taskItem: PropTypes.object.isRequired,
};

export default TaskItem;
