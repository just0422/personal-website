import React, {Component} from 'react';
import axios from 'axios';
import {Row, Col} from 'react-bootstrap';
import {Input, InputGroup, InputGroupAddon, Button} from 'reactstrap';
import Moment from 'react-moment';
import Slider from 'react-slick';
import {PacmanLoader} from 'react-spinners';

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
      nameValue: this.props.project ? this.props.project.name : 'no-name',
      error: null,
      loading: false,
      projectEditShowing: false,
      projectLabelShowing: true,
    };
  }

  deleteComment(project_id, comment_id, index) {
    this.setState({loading: true});
    api
      .projects()
      .deleteComment(project_id, comment_id)
      .then(resp => {
        this.setState({
          comments: this.state.comments.filter((_, i) => i !== index),
          loading: false,
        });
      })
      .catch(err => {
        this.setState({
          error: err,
        });
      });
  }

  showProjectEdit() {
    this.setState({
      projectEditShowing: true,
      projectLabelShowing: false,
    });
  }

  handleProjectCancel() {
    this.setState({
      projectEditShowing: false,
      projectLabelShowing: true,
    });
  }

  handleProjectUpdate() {
    let id = this.props.project.id;
    this.setState({loading: true});

    api
      .projects()
      .updateProject(id, {project: {name: this.state.nameValue}})
      .then(resp => {
        this.setState({
          projectEditShowing: false,
          projectLabelShowing: true,
          loading: false,
        });

        this.props.updateProject(resp.data);
      })
      .catch(err => {
        this.setState({
          error: err,
        });
      });
  }

  componentDidMount() {
    let id = this.props.project ? this.props.project.id : 0;
    this.setState({loading: true});
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
                loading: false,
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
    let project = this.props.project;
    let name = project ? project.name : 'no-name';
    let id = project ? project.id : '-1';

    if (this.state.error) {
      return <ErrorModal component="Project" error={this.state.error} />;
    } else if (this.state.loading) {
      return (
        <div>
          <div className="section-element-header">
            <strong>{name} - </strong>
          </div>
          <PacmanLoader
            sizeUnit={'px'}
            size={10}
            color={'#a00'}
            loading={this.state.loading}
            className="justify-content-center"
          />
          <hr />
        </div>
      );
    } else {
      let github_link = project ? project.github_link : null;
      let demo_link = project ? project.demo_link : null;
      let live_link = project ? project.live_link : null;
      let start = project ? new Date(project.start) : new Date();
      let end = project && project.end ? new Date(project.end) : new Date();
      
      let external_link = '';
      if(demo_link)
        external_link = demo_link;
      if(live_link)
        external_link = live_link;

      let skills = this.state.skills.map(skill => skill.name).join(', ');
      let comments = this.state.comments.map((comment, i) => {
        return (
          <li
            key={i}
            id={'comment-' + project.id + '-' + comment.id}
            onClick={() => this.deleteComment(project.id, comment.id, i)}>
            {comment.content}
          </li>
        );
      });

      let settings = {
        arrows: true,
        dots: true,
        infinite: false,
        slidesToShow: Math.floor((window.innerWidth * 0.7) / 180),
        slidesToScroll: 1,
      };
      let screenshots = this.state.screenshots.map((screenshot, i) => {
        return (
          <div key={i}>
            <img
              src={screenshot.image_data}
              alt="broken"
              id={'project-' + id + 'screenshot-' + screenshot.id}
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
                {this.state.projectLabelShowing && (
                  <div
                    id={'project-' + id + '-label'}
                    onClick={this.showProjectEdit}>
                    <strong>{name} - </strong>
                    <em>({skills})</em>
                  </div>
                )}
                {this.state.projectEditShowing && (
                  <div id={'project-' + id + '-edit'}>
                    <InputGroup className="project-edit">
                      <InputGroupAddon addonType="prepend">
                        <Button
                          className="cancel-button"
                          color="danger"
                          onClick={this.handleProjectCancel}>
                          Cancel
                        </Button>
                      </InputGroupAddon>
                      <Input
                        className={'project-edit-field'}
                        defaultValue={name}
                        onChange={e =>
                          this.setState({nameValue: e.target.value})
                        }
                      />
                      <InputGroupAddon addonType="append">
                        <Button
                          className="update-button"
                          color="success"
                          onClick={this.handleProjectUpdate}>
                          Update
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                )}
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
            { demo_link ? 'Demo: ' : '' }{ live_link ? 'Live Application: ' : '' }<a href={external_link} target="_blank" rel="noopener noreferrer">
                {external_link}
              </a>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="project-subleft-column">
              {comments}
            </Col>
            { screenshots.length > 0 && (<Col xs={12} className="project-subleft-column project-screenshots-container">
              <Slider {...settings}>{screenshots}</Slider>
            </Col> )}
          </Row>
          <hr />
        </div>
      );
    }
  }
}
