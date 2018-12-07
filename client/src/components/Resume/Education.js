import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import './resume_components.css';

export default class Education extends Component {
	render() {
		return (
			<div>
				<h3 className="resume-subheader">Education</h3>
				<strong className="section-element-header pull-left">Stony Brook University, New York</strong>
				<Row>
					<Col xs={6} className="section-element-details">M.S. Computer Science</Col>
					<Col xs={6} className="section-element-dates">Aug. 2016 - Aug. 2018</Col>
				</Row>
				<Row>
					<Col xs={6} className="section-element-details">B.S. Computer Science</Col>
					<Col xs={6} className="section-element-dates">Aug. 2012 - May 2016</Col>
				</Row>
			</div>
		);
	}
}
