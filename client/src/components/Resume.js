import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';

import Skills from './Resume/Skills'

export default class Resume extends Component {
	render(){
		return(
			<div className="container">
				<PageHeader>Resume</PageHeader>
				<Skills />
			</div>
		);
	}
}
