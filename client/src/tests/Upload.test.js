import React from 'react';
import {shallow} from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Upload from 'Upload';
import ErrorModal from 'Error';

import { projects } from './data/';
import { projectsUrl, screenshotsPath } from 'APIUtils';

describe('Upload test', () => {
	let projectScreenshotsUrl;
	let mock;

	beforeAll(() => {
		let id = projects[0]['id'];
		projectScreenshotsUrl = `${projectsUrl}/${id}${screenshotsPath}`;
	});

	beforeEach(() => mock = new MockAdapter(axios) );

	it('should render correctly', () => {
		const component = shallow(<Upload />);
		expect(component).toMatchSnapshot();
	});
});
