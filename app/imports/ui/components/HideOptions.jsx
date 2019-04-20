import React from 'react';
import PropTypes from 'prop-types';
import { List, Divider, Checkbox } from 'semantic-ui-react';

export default class HideOptions extends React.Component {
  render() {
    return (
        <List.Item>
          <Divider horizontal>Hide</Divider>
          <Checkbox style={{ marginBottom: '10px' }} label="Hide joined sessions" onClick={this.props.toggleJoined} />
          <Checkbox label="Hide conflicting sessions" onClick={this.props.toggleConflicting}/>
        </List.Item>
    );
  }
}

HideOptions.propTypes = {
  toggleJoined: PropTypes.func.isRequired,
  toggleConflicting: PropTypes.func.isRequired,
};
