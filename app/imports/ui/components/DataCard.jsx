import React from 'react';
import PropTypes from 'prop-types';
import { Statistic, Icon } from 'semantic-ui-react';

class DataCard extends React.Component {
  constructor(props) {
    super(props);
    this.value = this.props.value;
  }

  render() {
    return (
            <Statistic>
              <Statistic.Value>
                <Icon name={this.props.icon}/>
                {this.value}
              </Statistic.Value>

              <Statistic.Label>
                {this.props.text}
              </Statistic.Label>
            </Statistic>
    );
  }
}

DataCard.propTypes = {
  icon: PropTypes.string,
  value: PropTypes.number,
  text: PropTypes.string,
};

export default DataCard;
