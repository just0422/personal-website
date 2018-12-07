import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

import Skills from './Resume/Skills';
import Education from './Resume/Education';

export default class Resume extends Component {
	render(){
		return(
			<div className="container">
				<PageHeader>Justin Maldonado</PageHeader>
				<Grid>
					<Row>
						<Col xs={4}><a href="https://github.com/just0422">https://github.com/just0422</a></Col>
						<Col xs={4}><a href="mailto:justin.maldonado@stonybrook.edu">justin.maldonado@stonybrook.edu</a></Col>
						<Col xs={4}>(347) 922-5075</Col>
					</Row>
					<Row>
						<Col xs={6}>
							<Education />
						</Col>
						<Col xs={6}>
							<Skills />
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}
