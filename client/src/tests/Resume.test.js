import React from 'react';
import {shallow, mount} from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Resume from 'Resume';
import { skillsUrl, experiencesUrl } from 'APIUtils';
import { skills, experiences } from './data';

describe('Resume test', () => {
	let mock;

	const flushPromises = () => new Promise(resolve => setTimeout(resolve));
	const skillsFail = () => mock.onGet(skillsUrl).reply(404, 'No skills available');
	const skillsSucceed = () => mock.onGet(skillsUrl).reply(200, skills);
	const experiencesFail = () => mock.onGet(experiencesUrl).reply(404, 'No expriences available');
	const experiencesSucceed = () => mock.onGet(experiencesSucceed).reply(200, experiences);

	beforeEach(() => mock = new MockAdapter(axios));

	it('should shallow render correctly', () => {
		skillsSucceed();
		experiencesSucceed();

		const component = shallow(<Resume />);
		expect(component).toMatchSnapshot();
		expect(component.state('error')).toBeNull();
	});

	it('should mount correctly with no props', () => {
		const component = mount(<Resume />);
		expect(component).toMatchSnapshot();
		expect(component.state('error')).toBeNull();
	});
});
