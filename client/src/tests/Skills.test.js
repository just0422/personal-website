import React from 'react';
import {shallow} from 'enzyme';

import Skill from 'Resume/Skills';
import { skills } from './data';

describe('Skill', () => {
	it('should render correctly with no props', () => {
		const component = shallow(<Skill />);
		expect(component).toMatchSnapshot();
	});
	it('should render correctly with a skills prop', () => {
		const component = shallow(<Skill skills={skills} />);
		expect(component).toMatchSnapshot();
	});
});
