import React from 'react';
import PropTypes from 'prop-types';
import { Feed, Button } from 'semantic-ui-react';
import { TaskList } from '../../api/taskList/taskList';


/** Renders the Page for adding a document. */
class TaskItem extends React.Component {

  handleClick = () => TaskList.update(this.props.taskItem._id, {
    $set: { isDone: true },
  });

  render() {
    if (this.props.taskItem.isDone === false) {
      return this.renderItem();
    }
      return '';
  }

  renderItem() {
    return (
              <Feed.Event className={'feed-event'}>
                <Feed.Content>
                  <Feed.Date content={this.props.taskItem.createdAt.toLocaleDateString('en-US')}/>
                  <Feed.Summary>{this.props.taskItem.task}</Feed.Summary>
                </Feed.Content>
                <Button icon={'close'}
                        size={'mini'}
                        floated={'right'}
                        className={'clear-button'}
                        onClick={this.handleClick}/>
              </Feed.Event>
    );
  }
}

TaskItem.propTypes = {
  taskItem: PropTypes.object.isRequired,
};

export default TaskItem;
