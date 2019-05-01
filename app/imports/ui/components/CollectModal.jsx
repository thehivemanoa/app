import React from 'react';
import { Button, Modal, Label, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class CollectModal extends React.Component {
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
    const honeyStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      backgroundColor: 'white',
      height: '150px',
    };
    const honeyNumberStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      color: 'white',
    };
    const hasRespondedMessageStyle = { textAlign: 'center' };
    if (this.props.hasResponded) {
      hasRespondedMessageStyle.display = 'none';
    }
    return (
        <Modal
            style={{ backgroundColor: '#FBCE11' }}
            trigger={<Button style={headerButtonStyle}>Collect</Button>}
            size="small"
        >
          <Modal.Content style={{ backgroundColor: '#FBCE11' }}>
            <Header as="h3" style={{ color: 'white' }}>{this.props.title}</Header>
          </Modal.Content>
          <Modal.Content style={{ position: 'relative', backgroundColor: 'white', height: '190px' }}>
              <img src="/images/honey.png"
                   style={honeyStyle}/>
            <Header as="h1" style={honeyNumberStyle}>{`${this.props.honey}`}</Header>
          </Modal.Content>
          <Modal.Content style={hasRespondedMessageStyle}>
            <p style={{ display: 'inline-block' }}>The hive is built on generosity. To receive, honey please press the distribute button within 24 hrs of the end of the session.</p>
          </Modal.Content>
          <Modal.Content style={{ backgroundColor: '#FBCE11', paddingBottom: '20px' }}>
            <Button
                onClick={this.props.collectHoney}
                style={{
                  backgroundColor: '#FEC63B',
                  color: 'white',
                  borderStyle: 'solid',
                  borderWidth: '3px',
                  borderColor: 'white',
                  marginBottom: '20px',
                }}
                floated="right"
            >
              Collect
            </Button>
          </Modal.Content>
        </Modal>
    );
  }
}

CollectModal.propTypes = {
  collectHoney: PropTypes.func.isRequired,
  hasResponded: PropTypes.bool.isRequired,
  honey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
