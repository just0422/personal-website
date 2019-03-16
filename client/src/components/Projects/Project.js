import React, {Component} from 'react';
import axios from 'axios';
import {Row, Col, Input, InputGroup, InputGroupAddon, Button} from 'reactstrap';
import Moment from 'react-moment';
import Slider from 'react-slick';

import api from 'APIUtils';
import ErrorModal from 'Error';

import 'stylesheets/projects.scss';

export default class Project extends Component {
  constructor(props) {
		super(props);

		this.deleteComment = this.deleteComment.bind(this);
		this.showProjectEdit = this.showProjectEdit.bind(this);
		this.handleProjectCancel = this.handleProjectCancel.bind(this);
		this.handleProjectUpdate = this.handleProjectUpdate.bind(this);

    this.state = {
      skills: [],
      comments: [],
      screenshots: [],
			error: null,
			projectEditShowing: false,
			projectLabelShowing: true,
    };
	}

	deleteComment(project_id, comment_id, index) {
		api.projects().deleteComment(project_id, comment_id).then(resp => {
			this.setState({
				comments: this.state.comments.filter((_, i) => i !== index)
			});
		})
		.catch(err => {
			this.setState({
				error: err,
			});
		});
	}

	showProjectEdit(){
		this.setState({
			projectEditShowing: true,
			projectLabelShowing: false,
		})
	}

	handleProjectCancel(){
		this.setState({
			projectEditShowing: false,
			projectLabelShowing: true,
		})
	}

	handleProjectUpdate(){
		this.setState({
			projectEditShowing: false,
			projectLabelShowing: true,
		})
	}

  componentDidMount() {
    let id = this.props.project ? this.props.project.id : 0;
    if (id > 0) {
      axios
        .all([
          api.projects().getSkills(id),
          api.projects().getComments(id),
          api.projects().getScreenshots(id),
        ])
        .then(
          axios.spread(
            (skillsResponse, commentsResponse, screenshotsResponse) => {
              this.setState({
                skills: skillsResponse.data,
                comments: commentsResponse.data,
                screenshots: screenshotsResponse.data,
              });
            },
          ),
        )
        .catch(err => {
          this.setState({
            error: err,
          });
        });
    }
  }

  render() {
    if (this.state.error) {
      return <ErrorModal component="Project" error={this.state.error} />;
    } else {
      let project = this.props.project;
      let name = project ? project.name : 'no-name';
      let github_link = project ? project.github_link : 'github.com';
      let demo_link = project ? project.demo_link : 'github.com';
      let start = project ? new Date(project.start) : new Date();
      let end = project && project.end ? new Date(project.end) : new Date();

      let skills = this.state.skills.map(skill => skill.name).join(', ');
      let comments = this.state.comments.map((comment, i) => {
				return <li key={i} id={"comment-" + project.id + "-" + comment.id} onClick={() => this.deleteComment(project.id, comment.id, i)}>{comment.content}</li>;
      });

      let settings = {
        autoplay: true,
        arrows: true,
        centerMode: true,
        dots: true,
        infinite: true,
        slidesToShow: Math.floor((window.innerWidth * 0.7) / 180),
        slidesToScroll: 1,
      };
      let screenshots = this.state.screenshots.map((screenshot, i) => {
        return (
          <div key={i}>
            <img
              src={screenshot.image_data}
							alt="broken"
							id={"project-screenshot-" + screenshot.id}
              className="project-screenshot"
              onClick={() => this.props.openLightbox(project.id, screenshot.id)}
            />
          </div>
        );
      });
      return (
        <div>
          <Row>
            <Col xs={6}>
							<div className="section-element-header">
								{ this.state.projectLabelShowing &&
								<div id={"project-" + project.id + "-label"} onClick={this.showProjectEdit}>
									<strong>{name} - </strong>
									<em>({skills})</em>
								</div>
								}
								{ this.state.projectEditShowing &&
								<div id={"project-" + project.id + "-edit"}>
									<InputGroup>
										<InputGroupAddon addonType="prepend">
											<Button color="danger" onClick={this.handleProjectCancel}>Cancel</Button>
										</InputGroupAddon>
										<Input value={name}/>
										<InputGroupAddon addonType="append">
											<Button color="success" onClick={this.handleProjectUpdate}>Update</Button>
										</InputGroupAddon>
									</InputGroup>
								</div>
								}
							</div>
            </Col>
            <Col xs={6} className="project-right-column">
              <a href={github_link} target="_blank" rel="noopener noreferrer">
                {github_link}
              </a>
            </Col>
          </Row>
          <Row>
            <Col xs={6} className="project-subleft-column">
              <Moment format={'MMM. YYYY'}>{start}</Moment> -{' '}
              <Moment format={'MMM. YYYY'}>{end}</Moment>
            </Col>
            <Col xs={6} className="project-right-column">
              {demo_link}
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="project-subleft-column">
              {comments}
            </Col>
            <Col xs={12} className="project-subleft-column">
              <Slider {...settings}>{screenshots}</Slider>
            </Col>
          </Row>
          <hr />
        </div>
      );
    }
  }
}
