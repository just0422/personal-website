import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import './resume_components.css';

export default class Skills extends Component {
	render() {
		return (
			<div>
				<h3 className="resume-subheader">Skills</h3>
				<Grid>
					<Row>
						<Col xs={1}>Skill 1</Col>
						<Col xs={1}>Skill 2</Col>
						<Col xs={1}>Skill 3</Col>
						<Col xs={1}>Skill 4</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}
