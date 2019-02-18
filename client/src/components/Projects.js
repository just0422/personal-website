import React, {Component} from 'react';
import {PageHeader, Grid} from 'react-bootstrap';

import Project from 'Projects/Project';
import ErrorModal from 'Error';
import api from 'APIUtils';

import 'stylesheets/projects.scss';

export default class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
			projects: [],
			error: null
    };
  }

	componentDidMount() {
		api.projects().getAll().then(response => {
      this.setState({
        projects: response.data,
      });
		}).catch(err => {
			this.setState({
				error: err,
			})
		});
  }

	render() {
		if (this.state.error){
			return <ErrorModal component="Projects" error={this.state.error} />
		} else {
			return (
				<div className="container">
					<PageHeader>Projects</PageHeader>
					<Grid>
						{this.state.projects.map((project, i) => {
							return <Project project={project} key={i} />;
						})}
					</Grid>
				</div>
			);
		}
  }
}
