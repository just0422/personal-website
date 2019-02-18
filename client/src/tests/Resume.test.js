import React from 'react';
import {shallow, mount} from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Resume from 'Resume';
import Education from 'Resume/Education';
import Skills from 'Resume/Skills';
import Experience from 'Resume/Experience';
import ErrorModal from 'Error';
import { skillsUrl, experiencesUrl } from 'APIUtils';
import { skills, experiences } from './data';

describe('Resume test', () => {
	let mock;

	const flushPromises = () => new Promise(resolve => setTimeout(resolve));
	const skillsFail = () => mock.onGet(skillsUrl).reply(404, 'No skills available');
	const skillsSucceed = () => mock.onGet(skillsUrl).reply(200, skills);
	const experiencesFail = () => mock.onGet(experiencesUrl).reply(404, 'No expriences available');
	const experiencesSucceed = () => mock.onGet(experiencesUrl).reply(200, experiences);

	beforeEach(() => mock = new MockAdapter(axios));

	it('should shallow render correctly', async () => {
		skillsSucceed();
		experiencesSucceed();

		const component = shallow(<Resume />);
		await flushPromises();

		expect(component).toMatchSnapshot();
		expect(component.state('error')).toBeNull();
	});

	it('should mount correctly', async () => {
		skillsSucceed();
		experiencesSucceed();

		const component = mount(<Resume />);
		await flushPromises();
		component.update();

		expect(component).toMatchSnapshot();
		expect(component.state('error')).toBeNull();

		expect(component.containsAllMatchingElements([
			<Education />,
			<Skills />
		])).toBe(true);
	});

	it('should handle skills error', async () => {
		skillsFail();
		experiencesSucceed();

		const component = mount(<Resume />);
		await flushPromises();
		component.update();
		
		expect(component).toMatchSnapshot();
		expect(component.state('error')).toBeTruthy();
		expect(component.containsMatchingElement(<ErrorModal />)).toBe(true);	
	});

	it('should handle experiences error', async () => {
		skillsSucceed();
		experiencesFail();

		const component = mount(<Resume />);
		await flushPromises();
		component.update();
		
		expect(component).toMatchSnapshot();
		expect(component.state('error')).toBeTruthy();
		expect(component.containsMatchingElement(<ErrorModal />)).toBe(true);	
	});
});
