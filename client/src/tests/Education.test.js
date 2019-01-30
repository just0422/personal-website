import React from 'react';
import { shallow } from 'enzyme';

import Education from '../components/Resume/Education';

describe('Education', () => {
	it('should render correctly with no props' () => {
		const component = shallow(<Education />);
		expect(component).toMatchSnapshot();
	})
});
