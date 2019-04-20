import React from 'react';
import { Dropdown, Grid } from 'semantic-ui-react';

const _ = require('underscore');

export default class TimeSelector2 extends React.Component {
  render() {
    const rowStyle = {
      marginLeft: '14px',
      marginRight: '14px',
    };
    const columnStyle = {
      padding: 0,
    };
    const dropdownStyle = {
      width: '100%',
      paddingLeft: '5px',
      paddingRight: '10px',
    };
    const colonStyle = {
      width: '5px',
      display: 'inline-block',
      verticalAlign: 'middle',
    };

    return (
        <Grid style={rowStyle} columns="equal">
          <Grid.Column style={columnStyle} width={5}>
            <Dropdown
                style={dropdownStyle}
                compact
                selection
                icon={}
                options={_.times(12, index => ({ key: index, text: `${index + 1}`, value: index + 1 }))}
            />
          </Grid.Column>
          <Grid.Column style={{ display: 'inline-block', padding: 0 }} width={1} >
            <p style={{ lineHeight: '35px', textAlign: 'center' }}>:</p>
          </Grid.Column>
          <Grid.Column style={columnStyle} width={5}>
            <Dropdown
                style={dropdownStyle}
                compact
                selection
                options={_.times(60, index => ({ key: index, text: `${index + 1}`, value: index + 1 }))}
            />
          </Grid.Column>
          <Grid.Column style={columnStyle} width={5}>
            <Dropdown
                style={dropdownStyle}
                compact
                selection
                options={[{ key: 'am', text: 'AM', value: 'am' }, { key: 'pm', text: 'PM', value: 'pm' }]}
            />
          </Grid.Column>
        </Grid>
    );
  }
}
