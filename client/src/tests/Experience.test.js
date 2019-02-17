import React from 'react';
import {shallow,mount} from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Experience from 'Resume/Experience';

import { experience, skills, comments } from './data';
import { experiencesUrl, skillsPath, commentsPath } from 'APIUtils';


describe('Experience', () => {
	let experienceSkillsUrl, experienceCommentsUrl;
	let mock;

	const flushPromises = () => new Promise(resolve => setTimeout(resolve));
	const skillsFail = () => mock.onGet(experienceSkillsUrl).reply(404, 'No skills available');
	const skillsSucceed = () => mock.onGet(experienceSkillsUrl).reply(200, skills);
	const commentsFail = () => mock.onGet(experienceCommentsUrl).reply(404, 'No comments available');
	const commentsSucceed = () => mock.onGet(experienceCommentsUrl).reply(200, comments);

	beforeAll(() => {
		let id = experience['id'];
		experienceSkillsUrl = `${experiencesUrl}/${id}${skillsPath}`;
		experienceCommentsUrl = `${experiencesUrl}/${id}${commentsPath}`;
	});

  beforeEach(() => mock = new MockAdapter(axios) );

  it('should render correctly with no props', () => {
    const component = shallow(<Experience />);
    expect(component).toMatchSnapshot();
		expect(component.state('error')).toBeNull();
  });

  it('should render correctly with experience prop', async () => {
		skillsSucceed();
		commentsSucceed();

		const component = shallow(<Experience job={experience} />);
		await flushPromises();
    expect(component).toMatchSnapshot();
		expect(component.state('error')).toBeNull();
  });
	
  it('should handle skills error', async () => {
		skillsFail();
		commentsSucceed();

		const component = shallow(<Experience job={experience} />);
		await flushPromises();
    expect(component).toMatchSnapshot();
		expect(component.state('error')).toBeTruthy();
  });
	
  it('should handle comments error', async () => {
		skillsSucceed();
		commentsFail();

    const component = shallow(<Experience job={experience} />);
		await flushPromises();
    expect(component).toMatchSnapshot();
		expect(component.state('error')).toBeTruthy();
  });
});
