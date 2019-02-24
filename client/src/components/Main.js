import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import About from "About";
import Contact from "Contact";
import Projects from "Projects";
import Upload from "Upload";
import Resume from "Resume";

export default class Main extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route path="/about" component={About}/>
					<Route path="/contact" component={Contact}/>
					<Route path="/projects" component={Projects}/>
					<Route path="/upload" component={Upload}/>
					<Route path="/" component={Resume}/>
				</Switch>
			</div>
		);
	}
}
