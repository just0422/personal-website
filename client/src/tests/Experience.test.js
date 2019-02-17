import React from 'react';
import {shallow,mount} from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Experience from 'Resume/Experience';

import { experience, skills, comments } from './data';
import { experiencesUrl, skillsPath, commentsPath } from 'APIUtils';


describe('Experience', () => {
	const flushPromises = () => new Promise(resolve => setTimeout(resolve));
	let experienceSkillsUrl, experienceCommentsUrl;
	let mock;

	function skillsFail() { mock.onGet(experienceSkillsUrl).reply(404, 'No skills available'); }
	function skillsSucceed() { mock.onGet(experienceSkillsUrl).reply(200, skills); }
  function commentsFail() { mock.onGet(experienceCommentsUrl).reply(404, 'No comments available'); }
	function commentsSucceed() { mock.onGet(experienceCommentsUrl).reply(200, comments); }

	beforeAll(() => {
		let id = experience['id'];
		experienceSkillsUrl = `${experiencesUrl}/${id}${skillsPath}`;
		experienceCommentsUrl = `${experiencesUrl}/${id}${commentsPath}`;
	});

  beforeEach(() => mock = new MockAdapter(axios) );

  it('should render correctly with no props', () => {
    const component = shallow(<Experience />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly with experience prop', async () => {
		skillsSucceed();
		commentsSucceed();

		const component = shallow(<Experience job={experience} />);
		await flushPromises();
    expect(component).toMatchSnapshot();
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
