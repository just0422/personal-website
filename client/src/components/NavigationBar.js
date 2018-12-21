import React, { Component } from 'react';
import { Navbar, NavItem, Nav  } from 'react-bootstrap';

export default class NavigationBar extends Component {
	render () {
		return (
			<div>
				<Navbar inverse>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="#brand">React-Bootstrap</a>
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
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}
