import React from 'react';
import {shallow,mount} from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Experience from 'Resume/Experience';

import { experience, skills, comments } from './data';

describe('Experience', () => {
	const flushPromises = () => new Promise(resolve => setTimeout(resolve));
	let mock;

  beforeEach(() => mock = new MockAdapter(axios) );

  it('should render correctly with no props', () => {
    const component = shallow(<Experience />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly with experience prop', async () => {
    mock.onGet('/api/v1/experiences/1/skills').reply(200, skills);
    mock.onGet('/api/v1/experiences/1/comments').reply(200, comments);

		const component = shallow(<Experience job={experience} />);
		await flushPromises();
    expect(component).toMatchSnapshot();
  });
	
  it('should handle skills error', async () => {
    mock.onGet('/api/v1/experiences/1/skills').reply(404, 'No skills available');
    mock.onGet('/api/v1/experiences/1/comments').reply(200, comments);

		const component = shallow(<Experience job={experience} />);
		await flushPromises();
    expect(component).toMatchSnapshot();
  });
	
  it('should handle comments error', async () => {
    mock.onGet('/api/v1/experiences/1/skills').reply(200, skills);
    mock.onGet('/api/v1/experiences/1/comments').reply(404, 'No comments available');

    const component = shallow(<Experience job={experience} />);
		await flushPromises();
    expect(component).toMatchSnapshot();
  });
	
  it('should render Error', async () => {
    mock.onGet('/api/v1/experiences/1/skills').reply(200, skills);
    mock.onGet('/api/v1/experiences/1/comments').reply(404, 'No comments available');

		const component = mount(<Experience job={experience} />);
		component.update();
		await flushPromises();
		expect(component.state('error')).toBeTruthy();
	});
});
