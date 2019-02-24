import React, {Component} from 'react';
import {Form, FormGroup, Label, Input, CustomInput} from 'reactstrap';
import {PageHeader} from 'react-bootstrap';

import api from 'APIUtils';
import ErrorModal from 'Error';

export default class Upload extends Component {
	constructor(props){
		super(props);

		this.state = {
			projects: []
		}
	}

	componentDidMount(){
		api.projects().getAll().then(response => {
			this.setState({
				projects: response.data
			});
		}).catch(err => {
			this.setState({
				error: err
			})
		});
	}

	render() {
		if (this.state.error){
			return <ErrorModal component="Upload" error={this.state.error} />
		} else {
			return (
				<div className="container">
					<PageHeader>Upload</PageHeader>
					<Form>
						<FormGroup>
							<Label for="projects">Select a Project:</Label>
							<Input type="select" name="project_id" id="projects" defaultValue="-1">
								<option disabled value="-1">Pick one</option>
								{this.state.projects.map((project, i) => {
									return <option value={project.id} key={i}>{project.name}</option>
								})}
							</Input>
						</FormGroup>
						<FormGroup>
							<Label for="imageSelector">Select an image:</Label>
							<CustomInput type="file" name="image_data" id="imageSelector" />
						</FormGroup>
					</Form>
				</div>
			);
		}
	}
}
