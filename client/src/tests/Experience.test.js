import React from 'react';
import {shallow,mount} from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Experience from '../components/Resume/Experience';
import ErrorModal from '../components/Error';

import { job, skills, comments } from './data';

describe('Experience', () => {
	const flushPromises = () => new Promise(resolve => setTimeout(resolve));
	let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  it('should render correctly with no props', () => {
    const component = shallow(<Experience />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly with job prop', () => {
    mock.onGet('/api/v1/experiences/1/skills').reply(200, skills);
    mock.onGet('/api/v1/experiences/1/comments').reply(200, comments);

    const component = shallow(<Experience job={job} />);
    expect(component).toMatchSnapshot();
  });

  it('should handle skills error', () => {
    mock.onGet('/api/v1/experiences/1/skills').reply(404, 'No skills available');
    mock.onGet('/api/v1/experiences/1/comments').reply(200, comments);

    const component = shallow(<Experience job={job} />);
    expect(component).toMatchSnapshot();
  });

  it('should handle comments error', () => {
    mock.onGet('/api/v1/experiences/1/skills').reply(200, skills);
    mock.onGet('/api/v1/experiences/1/comments').reply(404, 'No comments available');

    const component = shallow(<Experience job={job} />);
    expect(component).toMatchSnapshot();
  });

  it('should render Error', async () => {
    mock.onGet('/api/v1/experiences/1/skills').reply(200, skills);
    mock.onGet('/api/v1/experiences/1/comments').reply(404, 'No comments available');

		const component = mount(<Experience job={job} />);
		await flushPromises();
		component.update();
		console.log("Checking");
		expect(component.find(<ErrorModal />).length).toBeGreaterThan(0);
  });
});
