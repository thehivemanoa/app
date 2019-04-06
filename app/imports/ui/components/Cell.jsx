import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import { Grid, Button } from 'semantic-ui-react';

export default class Cell extends React.Component {
  render() {
    return (
        <Grid.Column>
          <Button floated="right" onClick={this.props.handleDayClick}>{dateFns.getDate(this.props.date)}</Button>
        </Grid.Column>
    );
  }
}

Cell.propTypes = {
  handleDayClick: PropTypes.func.isRequired,
  date: PropTypes.object.isRequired,
};
