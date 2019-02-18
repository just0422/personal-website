import React from 'React';
import {shallow} from 'enzyme';

import NavigationBar from 'NavigationBar';

describe("Navigation bar tests", () => {
	it('should render correctly', () => {
		const component = shallow(<NavigationBar />);
		expect(component).toMatchSnapshot();
	});
});
