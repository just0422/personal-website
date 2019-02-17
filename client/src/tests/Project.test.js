import React from 'react';
import {shallow} from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Project from 'Projects/Project';

describe('Project', () => {
	const flushPromises = () => new Promise(resolve => setTimeout(resolve));
	let mock;

	beforeEach(() => mock = new MockAdapter(axios) );

	it('should render correctly with no props', () => {
		const component = shallow(<Project />);
		expect(component).toMatchSnapshot();
	});
});
