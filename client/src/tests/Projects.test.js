import React from 'react';
import {shallow, mount} from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {Lightbox} from 'react-modal-image';

import Projects from 'Projects';
import ErrorModal from 'Error';

import { projects, screenshots } from './data';
import { projectsUrl, screenshotsPath } from 'APIUtils';

describe('Projects test', () => {
	let project_id, screenshot_id;
	let projectScreenshotUrl;
	let mock;

	const flushPromises = () => new Promise(resolve => setTimeout(resolve));
	const projectsFail = () => mock.onGet(projectsUrl).reply(404, 'No skills available');
	const projectsSucceed = () => mock.onGet(projectsUrl).reply(200, projects);
	const projectLightBoxOpenFail = () => mock.onGet(projectScreenshotUrl).reply(400, 'No screenshot exists')
	const projectLightBoxOpenSucceed = () => mock.onGet(projectScreenshotUrl).reply(200, screenshots[0])

	beforeEach(() => mock = new MockAdapter(axios));

	beforeAll(() => {
		project_id = projects[0]['id'];
		screenshot_id = screenshots[0]['id'];

		projectScreenshotUrl = `${projectsUrl}/${project_id}${screenshotsPath}/${screenshot_id}`;
	})

	it('should shallow render correctly', () => {
		const component = shallow(<Projects />);
		expect(component).toMatchSnapshot();
		expect(component.state('error')).toBeNull();
	});

	it('should mount correctly', () => {
		projectsSucceed();

		const component = mount(<Projects />);
		flushPromises();
		component.update();

		expect(component).toMatchSnapshot();
		expect(component.state('error')).toBeNull();
	});

	it('should handle failed projects GET', async () => {
		projectsFail();

		const component = mount(<Projects />);
		await flushPromises();
		component.update();

		expect(component).toMatchSnapshot();
		expect(component.state('error')).toBeTruthy();
		expect(component.containsMatchingElement(<ErrorModal />)).toBe(true);
	});

	it('should handle correct lightbox GET and then close', async () => {
		projectLightBoxOpenSucceed();

		const component = mount(<Projects />);
		component.instance().handleLightboxOpen(project_id, screenshot_id);
		await flushPromises();
		component.update();

		expect(component).toMatchSnapshot();
		expect(component.state('lightboxEnabled')).toBe(true);
		expect(component.state('lightboxImageSrc')).toMatch(screenshots[0].image_data);

		component.instance().handleLightboxClose();
		await flushPromises();
		component.update();
		
		expect(component.state('lightboxEnabled')).toBe(false);
	});

	it('should handle failed lightbox GET', async () => {
		projectLightBoxOpenFail();

		const component = shallow(<Projects />);
		component.instance().handleLightboxOpen(project_id, screenshot_id);
		await flushPromises();
		component.update();

		expect(component).toMatchSnapshot();
		expect(component.state('error')).toBeTruthy();
		expect(component.containsMatchingElement(<ErrorModal />)).toBe(true);
	});
})
