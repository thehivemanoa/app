import React from 'react';
import PropTypes from 'prop-types';
import { Feed, Image } from 'semantic-ui-react';

/** Renders the Page for adding a document. */
class ReportItem extends React.Component {

  render() {
    return (
        <Feed.Event>
          <Feed.Label>
            <Image circular
                   size={'mini'}
                   src={'https://philipmjohnson.github.io/images/philip2.jpeg'}/>
          </Feed.Label>
          <Feed.Content>
            <Feed.Date content={this.props.reportItem.createdAt.toLocaleDateString('en-US')} />
            <Feed.Summary>
              {this.props.reportItem.description}
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
    );
  }
}

ReportItem.propTypes = {
  reportItem: PropTypes.object.isRequired,
};

export default ReportItem;
