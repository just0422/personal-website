import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

export default class ErrorModal extends Component {
  constructor(props) {
    super(props);

    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: true,
    };
  }

  handleRefresh() {
		window.location.reload(true);
	}

	handleClose() {
		this.setState({ show: false })
	}

	render() {
		let error = {
			response: "",
			status: "",
			statusText: ""
		}

		if (this.props.error)
			error = this.props.error.response;

    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{error.status} - Error with {this.props.component}</Modal.Title>
        </Modal.Header>
				<Modal.Body>
					<h4>Hmm... This wasn't supposed to happen.</h4> 
					<h4>Please refresh and try again</h4>
					<hr />
					<h4>Error Message:</h4>
          <div>{error.statusText}</div>
        </Modal.Body>
        <Modal.Footer>
					<Button variant="secondary" className="refresh-button" onClick={this.handleRefresh}>
						Refresh
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
