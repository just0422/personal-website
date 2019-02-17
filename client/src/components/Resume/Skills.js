import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import 'stylesheets/resume.scss';

export default class Skills extends Component {
	render() {
		if (this.props.skills) {
			return (
				<div>
					<h3 className="resume-subheader">Skills</h3>
					<Grid>
						<Row>
							{this.props.skills.map((skill, i) => {
								return (
									<Col xs={1} key={i}>
										{skill.name}
									</Col>
								);
							})}
						</Row>
					</Grid>
				</div>
			);
		} else {
			return <div></div>;
		}
  }
}
