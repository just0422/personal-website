import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import axios from 'axios';

import Skills from './Resume/Skills';
import Education from './Resume/Education';
import Experience from './Resume/Experience';

export default class Resume extends Component {
	constructor(props){
		super(props);

		this.state = {
			skills: [],
			experiences: []
		}
	}

	componentDidMount(){
		axios.all([
			axios.get("/api/v1/skills"),
			axios.get("/api/v1/experiences")
		]).then(axios.spread((skillsResponse, experiencesResponse) => {
				this.setState({
					skills: skillsResponse.data,
					experiences: experiencesResponse.data
				})
			}));
	}

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
							<Skills skills={this.state.skills}/>
						</Col>
					</Row>
					<hr />
					<Experience />
				</Grid>
			</div>
		);
	}
}
