import React from 'react';
import {mount,shallow} from 'enzyme';

import ErrorModal from 'Error';

describe('Error test', () => {
	let error = {
		response: "",
		status: "",
		statusText: ""
	}

	it('should render correctly with no props', () => {
		const component = shallow(<ErrorModal />);
		expect(component).toMatchSnapshot();
	});

	it('should render correctly without component', () => {
		const component = shallow(<ErrorModal error={error}/>);
		expect(component).toMatchSnapshot();
	});

	it('should render correctly without error', () => {
		const component = shallow(<ErrorModal component="component"/>);
		expect(component).toMatchSnapshot();
	});

	it('should correctly handle refreshing the page', () => {
		const component = shallow(<ErrorModal component="component" error={error} />);
		const button = component.find('Button.refresh-button');
		window.location.reload = jest.fn();

		button.simulate('click');
		expect(window.location.reload).toHaveBeenCalled();
	});

	it('should correctly handle closing the modal', () => {
		const component = mount(<ErrorModal component="component" error={error} />);
		const button = component.find('button.close');

		button.simulate('click');
		expect(component.state('show')).toBe(false);
	});
});
