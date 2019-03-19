import React from 'react';
import {shallow, mount} from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Contact from 'Contact';
import ErrorModal from 'Error';

import { contacts } from './data';
import { contactUrl } from 'APIUtils';

describe('Contact test', () => {
	let contactUrlTest;
	let mock, mockEvent, mockEmailEvent;

	const flushPromises = () => new Promise(resolve => setTimeout(resolve));
	const contactFail = () => mock.onPost(contactUrl).reply(500);
	const contactSucceed = () => mock.onPost(contactUrl).reply(200);


	it('should render correctly', () => {
		const component = shallow(<Contact />);
		expect(component).toMatchSnapshot();
	});

		beforeEach(() => {
			mock = new MockAdapter(axios) 
			mockEvent = { target: { value: 'test' } }
			mockEmailEvent = { target: { value: 'test@test.com' } }
		});

	//////////////////////////////////////////////////////
	// First name
	//////////////////////////////////////////////////////
	it('should handle untouched first name', () => {
		const component = mount(<Contact />);

		let form = component.find('form');
		form.simulate('submit');

		expect(component).toMatchSnapshot();
		expect(component.state('firstNameTouched')).toBe(true);
		expect(component.state('firstNameValid')).toBe(false);
		expect(component.state('firstNameErrorMessage')).toMatch("Enter first name");
	});

	it('should handle changed first name', () => {
		const component = mount(<Contact />);

		let firstName = component.find('input#contact-first-name')
		firstName.simulate('change', mockEvent);

		expect(component).toMatchSnapshot();
		expect(component.state('firstNameTouched')).toBe(true);
		expect(component.state('firstNameValid')).toBe(true);
		expect(component.state('firstName')).toMatch("test");
	});

	//////////////////////////////////////////////////////
	// Last name
	//////////////////////////////////////////////////////
	it('should handle untouched last name', () => {
		const component = mount(<Contact />);
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

	it('should handle changed last name', () => {
		const component = mount(<Contact />);

		let lastName = component.find('input#contact-last-name')
		lastName.simulate('change', mockEvent);

		expect(component).toMatchSnapshot();
		expect(component.state('lastNameTouched')).toBe(true);
		expect(component.state('lastNameValid')).toBe(true);
		expect(component.state('lastName')).toMatch("test");
	});

	//////////////////////////////////////////////////////
	// Email
	//////////////////////////////////////////////////////
	it('should handle untouched email', () => {
		const component = mount(<Contact />);
		component.setState({
			firstNameTouched: true,
			lastNameTouched: true,
		});

		let form = component.find('form');
		form.simulate('submit');

		expect(component).toMatchSnapshot();
		expect(component.state('emailTouched')).toBe(true);
		expect(component.state('emailValid')).toBe(false);
		expect(component.state('emailErrorMessage')).toMatch("Enter valid email address");
	});

	it('should handle changed invalid email', () => {
		const component = mount(<Contact />);

		let email = component.find('input#contact-email')
		email.simulate('change', mockEvent);

		expect(component).toMatchSnapshot();
		expect(component.state('emailErrorMessage')).toMatch("Enter valid email address");
		expect(component.state('emailTouched')).toBe(true);
		expect(component.state('emailValid')).toBe(false);
		expect(component.state('email')).toMatch("");
	});

	it('should handle changed valid email', () => {
		const component = mount(<Contact />);

		let email = component.find('input#contact-email')
		email.simulate('change', mockEmailEvent);

		expect(component).toMatchSnapshot();
		expect(component.state('emailTouched')).toBe(true);
		expect(component.state('emailValid')).toBe(true);
		expect(component.state('email')).toMatch("test@test.com");
	});

	//////////////////////////////////////////////////////
	// Message 
	//////////////////////////////////////////////////////
	it('should handle untouched message', () => {
		const component = mount(<Contact />);

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

	it('should handle changed message', () => {
		const component = mount(<Contact />);

		let message = component.find('textarea#contact-message')
		message.simulate('change', mockEvent);

		expect(component).toMatchSnapshot();
		expect(component.state('messageTouched')).toBe(true);
		expect(component.state('messageValid')).toBe(true);
		expect(component.state('message')).toMatch("test");
	});

	//////////////////////////////////////////////////////
	// Request submission
	//////////////////////////////////////////////////////
	it('should submit POST', () => {
		const component = mount(<Contact />);
		component.setState({
			firstNameTouched: true,
			firstNameValid: true,
			lastNameTouched: true,
			lastNameValid: true,
			messageTouched: true,
			messageValid: true,
			emailTouched: true,
			emailValid: true,
		});

		let form = component.find('form');
		form.simulate('submit');

		expect(component).toMatchSnapshot();
		expect(component.state('complete')).toBe(false);
		expect(component.state('loading')).toBe(true);
	});

	it('should submit POST and suceed', async () => {
		contactSucceed();

		const component = mount(<Contact />);
		component.setState({
			firstNameTouched: true,
			firstNameValid: true,
			lastNameTouched: true,
			lastNameValid: true,
			messageTouched: true,
			messageValid: true,
			emailTouched: true,
			emailValid: true,
		});

		let form = component.find('form');
		form.simulate('submit');
		await flushPromises();
		component.update();

		expect(component).toMatchSnapshot();
		expect(component.state('complete')).toBe(true);
		expect(component.state('loading')).toBe(false);
	});

	it('should handle submit POST fail', async () => {
		contactFail();

		const component = mount(<Contact />);
		component.setState({
			firstNameTouched: true,
			firstNameValid: true,
			lastNameTouched: true,
			lastNameValid: true,
			messageTouched: true,
			messageValid: true,
			emailTouched: true,
			emailValid: true,
		});

		let form = component.find('form');
		form.simulate('submit');
		await flushPromises();
		component.update();

		expect(component).toMatchSnapshot();
		expect(component.state('loading')).toBe(false);
    expect(component.state('complete')).toBe(false);
    expect(component.state('error')).toBeTruthy();
    expect(component.containsMatchingElement(<ErrorModal />)).toBe(true);
	});
});
