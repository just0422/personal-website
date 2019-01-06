import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import './resume_components.css';

export default class Skills extends Component {
	render() {
		console.log(this.props)
		return (
			<div>
				<h3 className="resume-subheader">Skills</h3>
				<Grid>
					<Row>
						{
							this.props.skills.map( (skill) => {
								return (<Col xs={1}>{skill.name}</Col>)
							})
						}
					</Row>
				</Grid>
			</div>
		);
	}
}
