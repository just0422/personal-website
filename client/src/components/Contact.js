import React, {Component} from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Button,
} from 'reactstrap';
import {PageHeader} from 'react-bootstrap';
import objectToFormData from 'object-to-formdata';
import {PacmanLoader} from 'react-spinners';
import validator from 'email-validator';

import api from 'APIUtils';
import ErrorModal from 'Error';
import 'stylesheets/contacts.scss';

export default class Contact extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);

    this.state = {
      error: null,
      loading: false,
      complete: false,
      firstName: '',
      firstNameValid: true,
      firstNameTouched: false,
      firstNameErrorMessage: '',
      lastName: '',
      lastNameValid: true,
      lastNameTouched: false,
      lastNameErrorMessage: '',
      email: '',
      emailValid: true,
      emailTouched: false,
      emailErrorMessage: '',
      message: '',
      messageValid: true,
      messageTouched: false,
      messageErrorMessage: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.state.firstNameTouched) {
      this.setState({
        firstNameTouched: true,
        firstNameValid: false,
        firstNameErrorMessage: 'Enter first name',
      });
    } else if (!this.state.lastNameTouched) {
      this.setState({
        lastNameTouched: true,
        lastNameValid: false,
        lastNameErrorMessage: 'Enter last name',
      });
    } else if (!this.state.emailTouched) {
      this.setState({
        emailTouched: true,
        emailValid: false,
        emailErrorMessage: 'Enter valid email',
      });
    } else if (!this.state.messageTouched) {
      this.setState({
        messageTouched: true,
        messageValid: false,
        messageErrorMessage: 'Enter Message',
      });
    } else if (
      this.state.firstNameValid &&
      this.state.lastNameValid &&
      this.state.emailValid &&
      this.state.messageValid
    ) {
      this.setState({loading: true});
      let contact = objectToFormData({
        contact: {
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          email: this.state.email,
          message: this.state.message,
        },
      });

      api
        .contact()
        .emailContact(contact)
        .then(resp => {
          this.setState({
            loading: false,
            complete: true,
          });
        })
        .catch(err => {
          this.setState({error: err, loading: false});
        });
    }
  }

  handleChangeFirstName(event) {
    this.setState({
      firstName: event.target.value,
      firstNameValid: true,
      firstNameTouched: true,
    });
  }

  handleChangeLastName(event) {
    this.setState({
      lastName: event.target.value,
      lastNameValid: true,
      lastNameTouched: true,
    });
  }

  handleChangeEmail(event) {
    if (validator.validate(event.target.value)) {
      this.setState({
        email: event.target.value,
        emailValid: true,
        emailTouched: true,
      });
    } else {
      this.setState({
        email: '',
        emailValid: false,
				emailTouched: true,
				emailErrorMessage: "Please enter a valid email address"
      });
    }
  }

  handleChangeMessage(event) {
    this.setState({
      message: event.target.value,
      messageValid: true,
      messageTouched: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorModal component="Contact" error={this.state.error} />;
    } else if (this.state.complete) {
      return (
        <div className="container">
          <PageHeader>Contact Me</PageHeader>
          <p className="text-center">
            Message successfully sent! I will get back to you soon! Thank you!
          </p>
        </div>
      );
    } else if (this.state.loading) {
      return (
        <div className="container">
          <PageHeader>Contact Me</PageHeader>
          <PacmanLoader
            sizeUnit={'px'}
            size={50}
            color={'#a00'}
            loading={this.state.loading}
          />
        </div>
      );
    } else {
      return (
        <div className="container">
          <PageHeader>Contact Me</PageHeader>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="contactFirstName" className="contact-information">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    id="contact-first-name"
                    onChange={this.handleChangeFirstName}
                  />
                  {!this.state.firstNameValid &&
                    this.state.firstNameTouched && (
                      <FormFeedback className="text-danger">
                        {this.state.firstNameErrorMessage}
                      </FormFeedback>
                    )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="contactLastName" className="contact-information">
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    name="contactLastName"
                    id="contact-last-name"
                    onChange={this.handleChangeLastName}
                  />
                  {!this.state.lastNameValid && this.state.lastNameTouched && (
                    <FormFeedback className="text-danger">
                      {this.state.lastNameErrorMessage}
                    </FormFeedback>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="contactEmail" className="contact-information">
                Email Address
              </Label>
              <Input
                type="email"
                name="contactEmail"
                id="contact-email"
                onChange={this.handleChangeEmail}
              />
              {!this.state.emailValid && this.state.emailTouched && (
                <FormFeedback className="text-danger">
                  {this.state.emailErrorMessage}
                </FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="contactMessage" className="contact-information">
                Message
              </Label>
              <Input
                type="textarea"
                name="contactMessage"
                id="contact-message"
                onChange={this.handleChangeMessage}
              />
              {!this.state.messageValid && this.state.messageTouched && (
                <FormFeedback className="text-danger">
                  {this.state.messageErrorMessage}
                </FormFeedback>
              )}
            </FormGroup>

            <Button size="lg" id="contact-submit" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      );
    }
  }
}
