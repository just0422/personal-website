import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';

import './project_components.css';

export default class Project extends Component {
	constructor(props){
		super(props);

		this.state = {
			skills: [], 
			comments: [],
			screenshots: []
		}
	}

	componentDidMount(){
		let id = this.props.project.id;

		axios.all([
			axios.get("/api/v1/projects/" + id + "/skills"),
			axios.get("/api/v1/projects/" + id + "/comments")
		]).then(axios.spread((skillsResponse, commentsResponse) => {
			this.setState({
				skills: skillsResponse.data,
				comments: commentsResponse.data
			})
		}));
	}

	render(){
		let project = this.props.project;
		let skills = this.state.skills.map( (skill) => { return skill.name }).join();
		let comments = this.state.comments.map( (comment, i) => {
			return (<li key={i}>{comment.content}</li>)
		});
		let screenshots = this.state.screenshots.map( (screenshot, i) => {
			return (<li key={i}>{screenshot.content}</li>)
		});
		return(
			<div>
				<Row>
					<Col xs={6}>
						<div className = "section-element-header">
							<strong>{project.name} - </strong> 
							<em>({skills})</em>
						</div>
					</Col>
					<Col xs={6} className="project-right-column">
						{project.github_link}
					</Col>
				</Row>
				<Row>
					<Col xs={6} className="project-subleft-column">
						<Moment format={"MMM. YYYY"}>{project.start}</Moment> - <Moment format={"MMM. YYYY"}>{project.end}</Moment>
					</Col>
					<Col xs={6} className="project-right-column">
						{project.demo_link}
					</Col>
				</Row>
				<Row>
					<Col xs={12} className="project-subleft-column">
						{comments}
					</Col>
					<Col xs={12} className="project-subleft-column">
						{screenshots}
					</Col>
				</Row>
				<hr />
			</div>
		)
	}
}
