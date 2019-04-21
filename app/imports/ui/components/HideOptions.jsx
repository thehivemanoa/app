import React from 'react';
import PropTypes from 'prop-types';
import { List, Header, Button, Checkbox } from 'semantic-ui-react';

export default class HideOptions extends React.Component {
  render() {
    const style = {
      paddingLeft: '14px',
      paddingRight: '21px',
      marginTop: '15px',
      marginBottom: '35px',
    };
    if (this.props.hideCollapse) {
      style.display = 'none';
    }

    return (
        <List style={{ paddingLeft: '21px', paddingRight: '14px', marginTop: '4px', marginBottom: '4px' }}>
          <List.Item>
            <Header as="h4" style={{ display: 'inline-block', lineHeight: '35px' }}>Hide</Header>
            <Button
                icon={this.props.hideCollapse ? 'plus' : 'minus'}
                floated="right"
                style={{
                  backgroundColor: 'Transparent',
                  paddingRight: 0,
                  margin: 0,
                }}
                onClick={this.props.toggleCollapse}
            />
          </List.Item>
          <List.Item style={style}>
            <Checkbox style={{ marginBottom: '10px' }} label="Hide joined sessions" onClick={this.props.toggleJoined}/>
            <Checkbox label="Hide conflicting sessions" onClick={this.props.toggleConflicting}/>
          </List.Item>
        </List>
    );
  }
}

HideOptions.propTypes = {
  toggleCollapse: PropTypes.func.isRequired,
  hideCollapse: PropTypes.bool.isRequired,
  toggleJoined: PropTypes.func.isRequired,
  toggleConflicting: PropTypes.func.isRequired,
};
