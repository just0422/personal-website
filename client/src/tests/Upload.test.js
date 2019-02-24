import React from 'react';
import {shallow} from 'enzyme';

import Upload from 'Upload';

describe('Upload test', () => {
	it('should render correctly', () => {
		const component = shallow(<Upload />);
		expect(component).toMatchSnapshot();
	});
});
