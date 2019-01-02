import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import './project_components.css';

export default class Projects extends Component {
	render(){
		return(
			<div className="container">
				<h1>Projects</h1>
				<Grid>
					<Row>
						<Col xs={6}>
							<div className = "section-element-header">
								<strong>Project 1</strong>
								<em>Languages</em>
							</div>
						</Col>
						<Col xs={6} className="project-right-column">
							Github Link
						</Col>
					</Row>
					<Row>
						<Col xs={6} className ="project-subleft-column">
							Dates
						</Col>
						<Col xs={6} className="project-right-column">
							Demo Link
						</Col>
					</Row>
					<Row>
						<Col xs={12} className="project-subleft-column">
							Descriptions
						</Col>
						<Col xs={12} className="project-subleft-column">
							Screenshots
						</Col>
					</Row>
				</Grid>
				<hr />
			</div>
		);
	}
}
