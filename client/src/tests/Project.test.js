import React from 'react';
import {shallow, mount} from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Project from 'Projects/Project';
import ErrorModal from 'Error';

import { projects, skills, comments, screenshots } from './data';
import { projectsUrl, skillsPath, commentsPath, screenshotsPath } from 'APIUtils';

describe('Project', () => {
	let projectSkillsUrl, projectCommentsUrl, projectCommentsDeleteUrl, projectScreenshotsUrl;
	let mock;

	const flushPromises = () => new Promise(resolve => setTimeout(resolve));
	const skillsFail = () => mock.onGet(projectSkillsUrl).reply(404, 'No skills available');
	const skillsSucceed = () => mock.onGet(projectSkillsUrl).reply(200, skills);
	const commentsFail = () => mock.onGet(projectCommentsUrl).reply(404, 'No comments available');
	const commentsSucceed = () => mock.onGet(projectCommentsUrl).reply(200, comments);
	const commentsDeleteFail = () => mock.onDelete(projectCommentsUrl).reply(404, 'Comment doesn\'t exist available');
	const commentsDeleteSucceed = () => mock.onDelete(projectCommentsDeleteUrl).reply(200);
	const screenshotsFail = () => mock.onGet(projectScreenshotsUrl).reply(404, 'No screenshots available');
	const screenshotsSucceed = () => mock.onGet(projectScreenshotsUrl).reply(200, screenshots);

	beforeAll(() => {
		let project_id = projects[0]['id'];
		let comment_id = projects[0]['id'];
		projectSkillsUrl = `${projectsUrl}/${project_id}${skillsPath}`;
		projectCommentsUrl = `${projectsUrl}/${project_id}${commentsPath}`;
		projectCommentsDeleteUrl = `${projectsUrl}/${project_id}${commentsPath}/${comment_id}`;
		projectScreenshotsUrl = `${projectsUrl}/${project_id}${screenshotsPath}`;
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

	it('should handle delete comments', async () => {
		skillsSucceed();
		commentsSucceed();
		screenshotsSucceed();
		commentsDeleteSucceed();

		const project_id = projects[0].id;
		const comment_id = comments[0].id;

		const component = mount(<Project project={projects[0]} />);
		await flushPromises();
		component.update();

		let commentsBeforeRequest = component.state('comments');
		let comment = component.find(`#comment-${project_id}-${comment_id}`);

		comment.simulate('click');
		await flushPromises();
		component.update();

		let commentsAfterRequest = component.state('comments');
		comment = component.find(`#comment-${project_id}-${comment_id}`);

		expect(component).toMatchSnapshot();
		expect(JSON.stringify(commentsBeforeRequest)).not.toEqual(JSON.stringify(commentsAfterRequest));
		expect(comment).toEqual({});
	});

	it('should handle delete comments fail', async () => {
		skillsSucceed();
		commentsSucceed();
		screenshotsSucceed();
		commentsDeleteFail();

		const project_id = projects[0].id;
		const comment_id = comments[0].id;

		const component = mount(<Project project={projects[0]} />);
		await flushPromises();
		component.update();

		let commentsBeforeRequest = component.state('comments');
		let comment = component.find(`#comment-${project_id}-${comment_id}`);

		comment.simulate('click');
		await flushPromises();
		component.update();

		let commentsAfterRequest = component.state('comments');
		comment = component.find(`#comment-${project_id}-${comment_id}`);

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

	it('should handle screenshots click', async () => {
		skillsSucceed();
		commentsSucceed();
		screenshotsSucceed();

		const openLightbox = jest.fn();
		const component = shallow(<Project project={projects[0]} openLightbox={openLightbox} />);
		await flushPromises();
		component.update();

		const screenshot = component.find("#project-screenshot-" + screenshots[0].id);
		screenshot.simulate('click');

		expect(component).toMatchSnapshot();
		expect(openLightbox).toHaveBeenCalled();
	});
});
