import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

export default class ErrorModal extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({show: false});
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.component}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Error in {this.props.component} component</div>
          <div>{this.props.error.response.data}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
