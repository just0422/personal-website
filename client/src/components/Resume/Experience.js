import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
import axios from 'axios';

import './resume_components.css';

export default class Experience extends Component {
	constructor(props){
		super(props)

		this.state = {
			skills: [],
			comments: []
		}
	}

	componentDidMount(){
		let id = this.props.job.id;
		axios.all([
			axios.get("/api/v1/experiences/" + id + "/skills"),
			axios.get("/api/v1/experiences/" + id + "/comments")
		]).then(axios.spread((skillsResponse, commentsResponse) => {
			this.setState({
				skills: skillsResponse.data,
				comments: commentsResponse.data
			})

			console.log(skillsResponse.data);
			console.log(commentsResponse.data);
		}));
	}

	render() {
		let job = this.props.job;
		let skills = this.state.skills.map( (skill) => { return skill.name }).join();
		let comments = this.state.comments.map( (comment, i) => { 
			return (<li key={i}>{comment.content}</li>)
		});

		return (
			<div>
				<Grid>
					<Row>
						<Col xs={6}>
							<div className = "section-element-header">
								<strong>{job.name}</strong>
							</div>
						</Col>
						<Col xs={6} className="section-element-dates">
							<Moment format={"MMM. YYYY"}>{job.start}</Moment> - <Moment format={"MMM. YYYY"}>{job.end}</Moment>
						</Col>
						<Col xs={12} className="section-element-header">
							<em>{job.title} ({skills})</em>
						</Col>
						<Col xs={12} className="section-element-comments">
							<ul>
								{comments}
							</ul>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}
