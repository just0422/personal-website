import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import axios from 'axios';
import {PacmanLoader} from 'react-spinners';

import Skills from 'Resume/Skills';
import Education from 'Resume/Education';
import Experience from 'Resume/Experience';
import api from 'APIUtils';

import ErrorModal from 'Error';

export default class Resume extends Component {
	constructor(props){
		super(props);

		this.state = {
			skills: [],
			experiences: [],
			error: null,
      loading: false,
		}
	}

	componentDidMount(){
    this.setState({loading: true});
		axios.all([
			api.skills().getAll(),
			api.experiences().getAll()
		]).then(axios.spread((skillsResponse, experiencesResponse) => {
        console.log(skillsResponse);
        console.log(experiencesResponse);
				this.setState({
          loading: false,
					skills: skillsResponse.data,
					experiences: experiencesResponse.data
				})
		})).catch(err => {
			this.setState({
        loading: false,
				error: err,
			})
		});
	}

	render(){
		if (this.state.error) {
			return <ErrorModal component="Resume" error={this.state.error} />
    } else if (this.state.loading) {
      return (
        <div className="container">
          <PageHeader>Justin Maldonado</PageHeader>
          <PacmanLoader
            sizeUnit={'px'}
            size={150}
            color={'#a00'}
            loading={this.state.loading}
            className="justify-content-center"
          />
        </div>
      );
		} else {
			return(
				<div className="container">
					<PageHeader>Justin Maldonado</PageHeader>
					<Grid>
						<Row>
							<Col xs={4}><a href="https://github.com/just0422" target="_blank" rel="noopener noreferrer">https://github.com/just0422</a></Col>
							<Col xs={4}><a href="mailto:just0422@gmail.com">just0422@gmail.com</a></Col>
							<Col xs={4}>(347) 922-5075</Col>
						</Row>
						<Row>
							<Col md={5} sm={12}>
								<Education />
							</Col>
							<Col md={7} sm={12}>
								<Skills skills={this.state.skills}/>
							</Col>
						</Row>
						<hr />
						<h3 className="resume-subheader">Experience</h3>
						{
							this.state.experiences.map( (job, i) => {
								return (<Experience job={job} key={i}/>)
							})
						}
					</Grid>
					<br />
					<br />
				</div>
			);
		}
	}
}
