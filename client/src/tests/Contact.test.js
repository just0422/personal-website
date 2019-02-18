import React from 'react';
import {shallow} from 'enzyme';

import Contact from 'Contact';

describe('Contact test', () => {
	it('should render correctly', () => {
		const component = shallow(<Contact />);
		expect(component).toMatchSnapshot();
	});
});
