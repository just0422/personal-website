import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

import 'stylesheets/resume.scss';

export default class Skills extends Component {
  render() {
    if (this.props.skills) {
      return (
        <div>
          <h3 className="resume-subheader">Skills</h3>
          <Row>
            {this.props.skills.map((skill, i) => {
              return (
                <Col xs={3} key={i}>
									<div className="resume-skill">{skill.name}</div>
                </Col>
              );
            })}
          </Row>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
