import React from 'react';
import {shallow} from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Project from 'Projects/Project';
import ErrorModal from 'Error';

import { projects, skills, comments, screenshots } from './data';
import { projectsUrl, skillsPath, commentsPath, screenshotsPath } from 'APIUtils';

describe('Project', () => {
	let projectSkillsUrl, projectCommentsUrl, projectScreenshotsUrl;
	let mock;

	const flushPromises = () => new Promise(resolve => setTimeout(resolve));
	const skillsFail = () => mock.onGet(projectSkillsUrl).reply(404, 'No skills available');
	const skillsSucceed = () => mock.onGet(projectSkillsUrl).reply(200, skills);
	const commentsFail = () => mock.onGet(projectCommentsUrl).reply(404, 'No comments available');
	const commentsSucceed = () => mock.onGet(projectCommentsUrl).reply(200, comments);
	const screenshotsFail = () => mock.onGet(projectScreenshotsUrl).reply(404, 'No screenshots available');
	const screenshotsSucceed = () => mock.onGet(projectScreenshotsUrl).reply(200, screenshots);

	beforeAll(() => {
		let id = projects[0]['id'];
		projectSkillsUrl = `${projectsUrl}/${id}${skillsPath}`;
		projectCommentsUrl = `${projectsUrl}/${id}${commentsPath}`;
		projectScreenshotsUrl = `${projectsUrl}/${id}${screenshotsPath}`;
	});

	beforeEach(() => mock = new MockAdapter(axios) );

	it('should render correctly with no props', () => {
		const component = shallow(<Project />);
		expect(component).toMatchSnapshot();
		expect(component.state('error')).toBeNull();
	});

	it('should render correctly with project prop', async () => {
		skillsSucceed();
		commentsSucceed();
		screenshotsSucceed();

		const component = shallow(<Project project={projects[0]} />);
		await flushPromises();
		expect(component).toMatchSnapshot();
		expect(component.state('error')).toBeNull();
	});

	it('should handle skills error', async() => {
		skillsFail();
		commentsSucceed();
		screenshotsSucceed();

		const component = shallow(<Project project={projects[0]} />);
		await flushPromises();
		component.update();

		expect(component).toMatchSnapshot();
		expect(component.state('error')).toBeTruthy();
		expect(component.containsMatchingElement(<ErrorModal />)).toBe(true);
	});

	it('should handle comments error', async () => {
		skillsSucceed();
		commentsFail();
		screenshotsSucceed();

		const component = shallow(<Project project={projects[0]} />);
		await flushPromises();
		component.update();

		expect(component).toMatchSnapshot();
		expect(component.state('error')).toBeTruthy();
		expect(component.containsMatchingElement(<ErrorModal />)).toBe(true);
	});

	it('should handle screenshots error', async () => {
		skillsSucceed();
		commentsSucceed();
		screenshotsFail();

		const component = shallow(<Project project={projects[0]} />);
		await flushPromises();
		component.update();

		expect(component).toMatchSnapshot();
		expect(component.state('error')).toBeTruthy();
		expect(component.containsMatchingElement(<ErrorModal />)).toBe(true);
	});
});
