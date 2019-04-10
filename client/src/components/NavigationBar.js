import React, {Component} from 'react';
import {Navbar, NavItem, Nav} from 'react-bootstrap';

import 'stylesheets/website.scss';

export default class NavigationBar extends Component {
  render() {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Justin Maldonado</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="/">
                Resume
              </NavItem>
              <NavItem eventKey={2} href="/projects">
                Projects
              </NavItem>
              <NavItem eventKey={4} href="/contact">
                Contact
              </NavItem>
              <NavItem eventKey={5} href="/upload">
                Upload
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
