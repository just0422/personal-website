import React, { Component } from 'react';
import { PageHeader, Grid } from 'react-bootstrap';
import axios from 'axios';

import Project from './Projects/Project'

import './Projects/project_components.scss';

export default class Projects extends Component {
	constructor(props){
		super(props);

		this.state = {
			projects: []
		}
	}

	componentDidMount(){
		axios.get("/api/v1/projects")
			.then((response) => {
				this.setState({
					projects: response.data
				})
			})
	}

	render(){
		return(
			<div className="container">
				<PageHeader>Projects</PageHeader>
				<Grid>
					{
						this.state.projects.map( (project, i) => {
							return (
								<Project project={project} key={i} />
							)
						})
					}
				</Grid>
			</div>
		);
	}
}
