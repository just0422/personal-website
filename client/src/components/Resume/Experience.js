import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Moment from 'react-moment';
import axios from 'axios';

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
      axios
				.all([
					api.experiences().getSkills(id),
          axios.get('/api/v1/experiences/' + id + '/comments'),
        ])
        .then(
          axios.spread((skillsResponse, commentsResponse) => {
            this.setState({
              skills: skillsResponse.data,
              comments: commentsResponse.data,
            });
          }),
        )
        .catch(err => {
          this.setState({
            error: err,
          });
        });
    }
  }

  render() {
    let job = this.props.job;
    let skills = this.state.skills
      .map(skill => {
        return skill.name;
      })
      .join();
    let comments = this.state.comments.map((comment, i) => {
      return <li key={i}>{comment.content}</li>;
		});

    if (this.state.error) {
		console.log("ErrorModal should render");
      return <ErrorModal component="Experience" error={this.state.error} />;
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
                <Moment format={'MMM. YYYY'}>{job.start}</Moment> -{' '}
                <Moment format={'MMM. YYYY'}>{job.end}</Moment>
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
