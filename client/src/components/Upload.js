import React, {Component} from 'react';
import {PageHeader} from 'react-bootstrap';
import {Button, Form, FormGroup, Label, Input, Row, Col} from 'reactstrap';
import objectToFormData from 'object-to-formdata';
import { PacmanLoader } from 'react-spinners';

import api from 'APIUtils';
import ErrorModal from 'Error';

export default class Upload extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangescreenshot = this.handleChangescreenshot.bind(this);
		this.handleChangeProject = this.handleChangeProject.bind(this);
    this.screenshotInput = React.createRef();

		this.state = {
			complete: false,
			loading: false,
      projects: [],
			project: '-1',
			screenshot: null,
			screenshotUrl: null,
    };
  }

  handleSubmit(event) {
		this.setState({ loading: true });
		event.preventDefault();
		let screenshot = objectToFormData({
			screenshot: {
				title: this.state.screenshot.name,
				image: this.state.screenshot,
			}
		});

    api
      .projects()
      .createScreenshot(this.state.project, screenshot)
      .then(response => {
				this.setState({ loading: false, screenshotUrl:null, complete: true });
      })
      .catch(err => {
        this.setState({error: err, loading:false, screenshotUrl: null});
			});
  }

  handleChangeProject(event) {
    this.setState({project: event.target.value}); // Project option ID
	}

	handleChangescreenshot(event) {
		this.setState({
			screenshot: event.target.files[0],
			screenshotUrl: URL.createObjectURL(event.target.files[0])
		}); // Project option ID
	}

  componentDidMount() {
    api
      .projects()
      .getAll()
      .then(response => {
        this.setState({
          projects: response.data,
        });
      })
      .catch(err => {
        this.setState({
          error: err,
        });
      });
  }

  render() {
    if (this.state.error) {
			return <ErrorModal component="Upload" error={this.state.error} />;
		} else if(this.state.complete) {
			return(
				<div className="container">
					<PageHeader>Upload</PageHeader>
					<p className="text-center">Image was successfully upload! Please select one of the options below:</p>

					<Row>
						<Col md={6}>
							<a className="btn btn-primary" href="/projects">Go to Projects</a>
						</Col>
						<Col md={6}>
							<a className="btn btn-primary" href="/upload">Upload Another</a>
						</Col>
					</Row>
				</div>
			);
    } else {
      return (
        <div className="container">
          <PageHeader>Upload</PageHeader>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="projects">Select a Project:</Label>
                  <Input
                    type="select"
                    name="project_id"
                    id="projects"
                    defaultValue={this.state.project}
                    onChange={this.handleChangeProject}>
                    <option disabled value="-1">
                      Pick one
                    </option>
                    {this.state.projects.map((project, i) => {
                      return (
                        <option value={project.id} key={i}>
                          {project.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="screenshotSelector">Select an screenshot:</Label>
                  <input
                    type="file"
                    name="screenshot_data"
                    id="screenshotSelector"
										ref={this.screenshotInput}
										onChange={this.handleChangescreenshot}
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <Button type="submit" color="success" size="lg">Submit</Button>
              </Col>
            </Row>
					</Form>
					<PacmanLoader
						sizeUnit={"px"}
						size={50}
						color={'#a00'}
						loading={this.state.loading}
					/>
					{ !this.state.loading && this.state.screenshotUrl &&
							<img src={this.state.screenshotUrl} alt="" width="320" height="180"/>
					}
        </div>
      );
    }
  }
}
