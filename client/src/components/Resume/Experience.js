import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import './resume_components.css';

export default class Experience extends Component {
	render() {
		return (
			<div>
				<h3 className="resume-subheader">Experience</h3>
				<Grid>
					<Row>
						<Col xs={6}>
							<div className = "section-element-header">
								<strong>Job 1</strong>
							</div>
						</Col>
						<Col xs={6} className="section-element-dates">
							Date
						</Col>
						<Col xs={12} className="section-element-header">
							<em>Job Title (languages)</em>
						</Col>
						<Col xs={12} className="section-element-details">
							Job Description
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}
