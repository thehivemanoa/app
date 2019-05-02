import React from 'react';
import PropTypes from 'prop-types';
import { Feed, Image, Button, Label, Icon, Popup } from 'semantic-ui-react';

/** Renders the Page for adding a document. */
class ReportItem extends React.Component {

  handleClick() {
    return (null);
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
                 className="collapsable"
                 on={'click'}
                 hideOnScroll
                 trigger={
                   <Button animated size={'mini'} style={{ height: '30px' }}>
                     <Button.Content visible>Resolve</Button.Content>
                     <Button.Content hidden>
                       <Icon name='arrow right' />
                     </Button.Content>
                   </Button>
                 }
          >
            <Button content={'Disregard'}/>
            <Button content={'Ban'}/>
          </Popup>
        </Feed.Event>
    );
  }
}

ReportItem.propTypes = {
  reportItem: PropTypes.object.isRequired,
};

export default ReportItem;
