import React from 'react';
import {shallow, mount} from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Contact from 'Contact';

import { contacts } from './data';
import { contactUrl } from 'APIUtils';

describe('Contact test', () => {
	let contactUrlTest;
	let mock;

	const flushPromises = () => new Promise(resolve => setTimeout(resolve));
	const contactFail = () => mock.onGet

	it('should render correctly', () => {
		const component = shallow(<Contact />);
		expect(component).toMatchSnapshot();
	});

	beforeEach(() => mock = new MockAdapter(axios) );

	it('should handle untouched first name', () => {
		const component = mount(<Contact />);
		component.update();

		let form = component.find('form');
		form.simulate('submit');

		expect(component).toMatchSnapshot();
		expect(component.state('firstNameTouched')).toBe(true);
		expect(component.state('firstNameValid')).toBe(false);
		expect(component.state('firstNameErrorMessage')).toMatch("Enter first name");
	});

	it('should handle untouched last name', () => {
		const component = mount(<Contact />);
		component.update();

		component.setState({
			firstNameTouched: true
		});

		let form = component.find('form');
		form.simulate('submit');

		expect(component).toMatchSnapshot();
		expect(component.state('lastNameTouched')).toBe(true);
		expect(component.state('lastNameValid')).toBe(false);
		expect(component.state('lastNameErrorMessage')).toMatch("Enter last name");
	});

	it('should handle untouched email', () => {
		const component = mount(<Contact />);
		component.update();

		component.setState({
			firstNameTouched: true,
			lastNameTouched: true,
		});

		let form = component.find('form');
		form.simulate('submit');

		expect(component).toMatchSnapshot();
		expect(component.state('emailTouched')).toBe(true);
		expect(component.state('emailValid')).toBe(false);
		expect(component.state('emailErrorMessage')).toMatch("Enter valid email");
	});

	it('should handle untouched message', () => {
		const component = mount(<Contact />);
		component.update();

		component.setState({
			firstNameTouched: true,
			lastNameTouched: true,
			emailTouched: true,
		});

		let form = component.find('form');
		form.simulate('submit');

		expect(component).toMatchSnapshot();
		expect(component.state('messageTouched')).toBe(true);
		expect(component.state('messageValid')).toBe(false);
		expect(component.state('messageErrorMessage')).toMatch("Enter message");
	});
});
