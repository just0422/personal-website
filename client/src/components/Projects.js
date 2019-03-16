import React, {Component} from 'react';
import {PageHeader, Grid} from 'react-bootstrap';
import {Lightbox} from 'react-modal-image';
import Countdown from 'react-countdown-now';

import Project from 'Projects/Project';
import ErrorModal from 'Error';
import api from 'APIUtils';
import 'stylesheets/projects.scss';

export default class Projects extends Component {
  constructor(props) {
    super(props);

    this.resetTime = this.resetTime.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.handleLightboxOpen = this.handleLightboxOpen.bind(this);
    this.handleLightboxClose = this.handleLightboxClose.bind(this);

    this.state = {
      projects: [],
      error: null,
      lightboxEnabled: false,
      lightboxImageSrc: '',
      countDownTo: 0,
    };
  }

  handleLightboxOpen(project_id, screenshot_id) {
    api
      .projects()
      .getScreenshot(project_id, screenshot_id)
      .then(response => {
        this.setState({
          lightboxEnabled: true,
          lightboxImageSrc: response.data['image_data'],
        });
      })
      .catch(err => {
        this.setState({
          error: err,
        });
      });
  }

  handleLightboxClose() {
    this.setState({
      lightboxEnabled: false,
    });
  }

  updateProject(project) {
    this.setState({
      projects: this.state.projects.map((state_project, i) => {
        if (project.id === state_project.id) return project;
        return state_project;
      }),
    });
  }

  resetTime() {
    const interval = 900000; // 15 min
    let time = Date.now();
    let remainder = time % interval;

    this.setState({
      countDownTo: time + interval - remainder,
    });
  }

  componentDidMount() {
    this.resetTime();
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
      return <ErrorModal component="Projects" error={this.state.error} />;
    } else {
      return (
        <div className="container">
          {this.state.lightboxEnabled && (
            <Lightbox
              medium={this.state.lightboxImageSrc}
              onClose={this.handleLightboxClose}
              hideZoom={true}
              hideDownload={true}
            />
          )}
          <div className="website-interactive-message">
            This website is interactive. Any changes made will be reset every 15
            minutes. Click on a project name to update it. Click on any bullet
            point to delete it.
            <br />
            Restting in{' '}
            <Countdown
              date={this.state.countDownTo}
              onComplete={() => this.resetTime()}
              precision={2}
              zeroPadDays={0}
            />
          </div>
          <PageHeader>Projects</PageHeader>
          <Grid>
            {this.state.projects.map((project, i) => {
              return (
                <Project
                  project={project}
                  key={i}
                  openLightbox={this.handleLightboxOpen}
                  updateProject={this.updateProject}
                />
              );
            })}
          </Grid>
        </div>
      );
    }
  }
}
