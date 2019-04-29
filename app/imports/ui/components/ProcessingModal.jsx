import React from 'react';
import { Button, Modal, Progress, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class ProcessingModal extends React.Component {
  render() {
    const headerButtonStyle = {
      position: 'absolute',
      top: '50%',
      left: '55%',
      transform: 'translate(-50%,-50%)',
      backgroundColor: 'white',
      color: 'black',
      height: '25px',
      width: '90px',
      verticalAlign: 'middle',
      textAlign: 'center',
      padding: 0,
    };

    return (
        <Modal
            trigger={<Button style={headerButtonStyle}>Processing</Button>}
        >
          <Modal.Content style={{ backgroundColor: '#FEC63B' }}>
            <Header as="h3" style={{ color: 'white' }}>{this.props.title}</Header>
          </Modal.Content>
          <Modal.Content>
            <Header as="h5">Waiting for Responses</Header>
            <Progress
                value={this.props.respondents}
                total={this.props.attendees}
                progress="ratio"
                style={{ color: '#FEC63B' }}/>
          </Modal.Content>
          <Modal.Content>
            <Header as="h5">Time Elapsed</Header>
            <Progress
                percent={this.props.percentElapsed}
                progress
                style={{ color: '#FEC63B' }}/>
          </Modal.Content>
        </Modal>
    );
  }
}

ProcessingModal.propTypes = {
  title: PropTypes.string.isRequired,
  respondents: PropTypes.number.isRequired,
  attendees: PropTypes.number.isRequired,
  percentElapsed: PropTypes.number.isRequired,
};
