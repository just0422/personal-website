import React, {Component} from 'react';
import {Navbar, NavItem, Nav, Button} from 'react-bootstrap';
import Countdown from 'react-countdown-now';

import 'stylesheets/website.scss';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.resetTime = this.resetTime.bind(this);

    this.state = {
      countDownTo: 0,
    };
  }

  resetTime(complete) {
    const interval = 900000; // 15 min
    let time = Date.now();
    let remainder = time % interval;

    this.setState({
      countDownTo: time + interval - remainder,
    });
  }

  componentDidMount() {
    this.resetTime(false);
  }

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
              <NavItem eventKey={3} href="/about">
                About
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
        <div className="website-reset-countdown">
          <Button onClick={this.props.handleLoading}>Reset Now</Button> Reseting
          in{' '}
          <Countdown
            date={this.state.countDownTo}
            onComplete={() => this.resetTime(true)}
            precision={2}
            zeroPadDays={0}
          />
        </div>
      </div>
    );
  }
}
