import React from 'react';
import {shallow, mount} from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Projects from 'Projects';
import Project from 'Projects/Project';
import ErrorModal from 'Error';

import { projects } from './data';
import { projectsUrl } from 'APIUtils';

describe('Projects test', () => {
	let mock;

	const flushPromises = () => new Promise(resolve => setTimeout(resolve));
	const projectsFail = () => mock.onGet(projectsUrl).reply(404, 'No skills available');
	const projectsSucceed = () => mock.onGet(projectsUrl).reply(200, projects);

	beforeEach(() => mock = new MockAdapter(axios));

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
})
