import React from 'react';
import {shallow,mount} from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Upload from 'Upload';
import ErrorModal from 'Error';

import { projects, screenshots } from './data';
import { projectsUrl, screenshotsPath } from 'APIUtils';

describe('Upload test', () => {
	let projectScreenshotUrl;
	let mock;

	const flushPromises = () => new Promise(resolve => setTimeout(resolve));
	const projectsFail = () => mock.onGet(projectsUrl).reply(404, 'No skills available');
	const projectsSucceed = () => mock.onGet(projectsUrl).reply(200, projects);
	const projectScreenshotPostFail = () => mock.onPost(projectScreenshotUrl).reply(500, 'Couldn\'t create')
	const projectScreenshotPostSucceed = () => mock.onPost(projectScreenshotUrl).reply(201, screenshots[0])

	beforeAll(() => {
		let id = projects[0]['id'];
		projectScreenshotUrl = `${projectsUrl}/${id}${screenshotsPath}`;
	});

	beforeEach(() => mock = new MockAdapter(axios) );

	it('should render correctly', async () => {
		projectsSucceed();

		const component = shallow(<Upload />);
		await flushPromises();
		component.update();

		expect(component).toMatchSnapshot();
		expect(component.state('error')).toBeNull();
		expect(component.state('projects')).toHaveLength(2);
		expect(component.state('projects')).toEqual(projects);
	});

	it('should handle failed projects GET', async () => {
		projectsFail();

		const component = shallow(<Upload />);
		await flushPromises();
		component.update();

		expect(component).toMatchSnapshot();
		expect(component.state('error')).toBeTruthy();
		expect(component.containsMatchingElement(<ErrorModal />)).toBe(true);	
	});

	it('should correctly handle a project select', () => {
		const component = shallow(<Upload />);
		component.setState({
			projects: projects
		});

		const select = component.find('.projects-select');
		select.simulate('change', { target: { value: '1' } });
		component.update();

		expect(component).toMatchSnapshot();
		expect(component.state('project')).toMatch("1");
	});

	it('should correctly handle an invalide filetype image select', () => {
		const component = shallow(<Upload />);

		const screenshot = component.find(".screenshot-file-select");
		screenshot.simulate('change', { target: { files: [{ type: "pdf" }] } });
		component.update();

		expect(component).toMatchSnapshot();
		expect(component.state("screenshotUrl")).toMatch("");
		expect(component.state("screenshotValid")).toBe(false);
		expect(component.state("screenshotTouched")).toBe(true);
		expect(component.state("screenshotErrorMessage")).toMatch("Invalid file type");
	});

	it('should correctly handle a too large image select', () => {
		const component = shallow(<Upload />);

		const screenshot = component.find(".screenshot-file-select");
		screenshot.simulate('change', { target: { files: [{ type: "image/jpg", size: 100000000 }] } });
		component.update();

		expect(component).toMatchSnapshot();
		expect(component.state("screenshotUrl")).toMatch("");
		expect(component.state("screenshotValid")).toBe(false);
		expect(component.state("screenshotTouched")).toBe(true);
		expect(component.state("screenshotErrorMessage")).toMatch("File too large");
	});

	it('should correctly handle a image select', () => {
		const component = shallow(<Upload />);
		global.URL.createObjectURL = jest.fn();

		const screenshot = component.find(".screenshot-file-select");
		screenshot.simulate('change', { target: { files: [{ type: "image/jpg", size: 1000000 }] } });
		component.update();

		expect(component).toMatchSnapshot();
		expect(component.state("screenshotValid")).toBe(true);
		expect(component.state("screenshotTouched")).toBe(true);
	});

	it('should not submit if projects haven\'t been touched', async () => {
		projectsSucceed();
		const component = mount(<Upload />);
		const form = component.find('form.upload-form');

		await flushPromises();
		form.simulate('submit');
		component.update();
		
		expect(component).toMatchSnapshot();
		expect(component.state('projectTouched')).toBe(true);
		expect(component.state('projectValid')).toBe(false);
		expect(component.state('projectErrorMessage')).toMatch("Select a project");
	});

	it('should not submit if files haven\'t been touched', async () => {
		projectsSucceed();
		const component = mount(<Upload />);
		const form = component.find('form.upload-form');
		component.setState({ projectTouched: true });

		await flushPromises();
		form.simulate('submit');
		component.update();

		expect(component).toMatchSnapshot();
		expect(component.state('screenshotUrl')).toMatch('');
		expect(component.state('screenshotTouched')).toBe(true);
		expect(component.state('screenshotValid')).toBe(false);
		expect(component.state('screenshotErrorMessage')).toMatch("Select an image");
	});

	it('should submit POST', async () => {
		projectsSucceed();
		projectScreenshotPostSucceed();

		const component = mount(<Upload />);
		const form = component.find('form.upload-form');

		// Setup environment for request to be started
		component.setState({
			project: projects[0].id,
			projectValid: true,
			projectTouched: true,
			screenshot: screenshots[0],
			screenshotValid: true,
			screenshotTouched: true,
		});
		
		// Wait for GET /projects to return
		await flushPromises();
		component.update();

		form.simulate('submit');
		expect(component.state('loading')).toBe(true);
		expect(component.state('complete')).toBe(false);
	});

	it('should submit POST and succeed', async () => {
		projectsSucceed();
		projectScreenshotPostSucceed();

		const component = mount(<Upload />);
		const form = component.find('form.upload-form');

		// Setup environment for request to be started
		component.setState({
			project: projects[0].id,
			projectValid: true,
			projectTouched: true,
			screenshot: screenshots[0],
			screenshotValid: true,
			screenshotTouched: true,
		});
		
		// Wait for GET /projects to return
		await flushPromises();
		component.update();

		form.simulate('submit');
		// Wait for POST /projects/<id>/screenshots
		await flushPromises();
		component.update();

		expect(component).toMatchSnapshot();
		expect(component.state('loading')).toBe(false);
		expect(component.state('complete')).toBe(true);
	});

	it('should handle submit POST fail', async () => {
		projectsSucceed();
		projectScreenshotPostFail();

		const component = mount(<Upload />);
		const form = component.find('form.upload-form');

		// Setup environment for request to be started
		component.setState({
			project: projects[0].id,
			projectValid: true,
			projectTouched: true,
			screenshot: screenshots[0],
			screenshotValid: true,
			screenshotTouched: true,
		});
		
		// Wait for GET /projects to return
		await flushPromises();
		component.update();

		form.simulate('submit');
		expect(component.state('loading')).toBe(true);
		expect(component.state('complete')).toBe(false);
		// Wait for POST /projects/<id>/screenshots
		await flushPromises();
		component.update();

		expect(component).toMatchSnapshot();
		expect(component.state('loading')).toBe(false);
		expect(component.state('complete')).toBe(false);
		expect(component.state('screenshotUrl')).toBe(null);
		expect(component.state('error')).toBeTruthy();
		expect(component.containsMatchingElement(<ErrorModal />)).toBe(true);	
	});
});
