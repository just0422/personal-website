import React, {Component} from 'react';
import {Row, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {PageHeader} from 'react-bootstrap';

import 'stylesheets/contacts.scss';

export default class Contact extends Component {
  render() {
    return (
      <div className="container">
        <PageHeader>Contact Me</PageHeader>
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="contactFirstName" className="contact-information">
                  First Name
                </Label>
                <Input type="text" name="contactFirstName" id="contact-first-name" />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="contactLastName" className="contact-information">
                  Last Name
                </Label>
                <Input type="text" name="contactLastName" id="contact-last-name" />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="contactEmail" className="contact-information">
              Email Address
            </Label>
            <Input type="email" name="contactEmail" id="contact-email" />
          </FormGroup>
          <FormGroup>
            <Label for="contactMessage" className="contact-information">
              Message
            </Label>
            <Input type="textarea" name="contactMessage" id="contact-message" />
          </FormGroup>

          <Button size="lg" id="contact-submit" block>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
