import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Moment from 'react-moment';
import axios from 'axios';
import {PacmanLoader} from 'react-spinners';

import api from 'APIUtils';
import ErrorModal from 'Error';

import 'stylesheets/resume.scss';

export default class Experience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skills: [],
      comments: [],
      error: null,
      loading: false
    };
  }

  static defaultProps = {
    job: {
      id: -1,
      name: '',
      title: '',
      start: '',
      end: '',
    },
  };

  componentDidMount() {
    let id = this.props.job.id;
    if (id > 0) {
      this.setState({loading: true});
      axios
        .all([
          api.experiences().getSkills(id),
          api.experiences().getComments(id),
        ])
        .then(
          axios.spread((skillsResponse, commentsResponse) => {
            this.setState({
              loading: false,
              skills: skillsResponse.data,
              comments: commentsResponse.data,
            });
          }),
        )
        .catch(err => {
          this.setState({
            loading: false,
            error: err,
          });
        });
    }
  }

  render() {
    let job = this.props.job;
    let skills = this.state.skills
      .map(skill => skill.name)
      .join(', ');
    let comments = this.state.comments.map((comment, i) => {
      return <li key={i}>{comment.content}</li>;
    });

    if (!job.end){
      job.end = new Date()
    }

    if (this.state.error) {
      return <ErrorModal component="Experience" error={this.state.error} />;
    } else if (this.state.loading) {
      return (
        <div>
          <div className="section-element-header">
            <strong>{job.name}</strong>
          </div>
          <PacmanLoader
            sizeUnit={'px'}
            size={10}
            color={'#a00'}
            loading={this.state.loading}
            className="justify-content-center"
          />
        </div>
      );
    } else {
      return (
        <div>
          <Grid>
            <Row>
              <Col xs={6}>
                <div className="section-element-header">
                  <strong>{job.name}</strong>
                </div>
              </Col>
              <Col xs={6} className="section-element-dates">
                <Moment format={'MMM. YYYY'}>{new Date(job.start)}</Moment> -{' '}
                <Moment format={'MMM. YYYY'}>{new Date(job.end)}</Moment>
              </Col>
              <Col xs={12} className="section-element-header">
                <em>
                  {job.title} ({skills})
                </em>
              </Col>
              <Col xs={12} className="section-element-comments">
                <ul>{comments}</ul>
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
  }
}
