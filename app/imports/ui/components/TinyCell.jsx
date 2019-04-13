import React from 'react';
import dateFns from 'date-fns';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class TinyCell extends React.Component {
  render() {
    const style = {
      height: '100%',
      width: '100%',
      backgroundColor: 'Transparent',
      padding: 0,
      margin: 0,
      borderRadius: 0,
    };
    if (this.props.isInRange) {
      style.backgroundColor = 'rgb(8,27,52)';
      style.color = 'white';
    }

    return (
        <Button style={style}
                onMouseDown={this.props.setFromDate}
                onMouseEnter={this.props.setToDate}>
          {dateFns.format(this.props.date, 'D')}
        </Button>
    );
  }
}

TinyCell.propTypes = {
  isInRange: PropTypes.bool.isRequired,
  date: PropTypes.object.isRequired,
  setToDate: PropTypes.func.isRequired,
  setFromDate: PropTypes.func.isRequired,
};
