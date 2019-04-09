import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SearchResults from '../components/SearchResults';
import SearchBox from '../components/SearchBox';
import { Sessions } from '../../api/session/session';

class SearchPage extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <Grid>
          <Grid.Column width={11}>
            <SearchResults />
          </Grid.Column>
          <Grid.Column width={5}>
            <SearchBox />
          </Grid.Column>
        </Grid>
    );
  }
}

SearchPage.propTypes = {
  sessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Sessions');
  return {
    sessions: Sessions.find({}).fetch(),
    ready: subscription.ready(),
  };
})(SearchPage);
