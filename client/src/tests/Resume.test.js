import React from 'react';
import {shallow, mount} from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Resume from 'Resume';

describe('Resume test', () => {
	it('should renter correctly with no props', () => {
		const component = shallow(<Resume />);
		expect(component).toMatchSnapshot();
		expect(component.state('error')).toBeNull();
	});
});
