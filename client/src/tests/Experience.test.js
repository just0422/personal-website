import React from 'react';
import {shallow} from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Experience from '../components/Resume/Experience';

describe('Experience', () => {
  let mock, job, skills, comments;
  beforeEach(() => {
    mock = new MockAdapter(axios);

    job = {
      id: 1,
      name: 'abcd',
      title: 'def',
      start: 'Aug 2017',
      end: 'Sept 2018',
    };

    skills = {
      data: [
        {
          name: 'abc',
          years: '3',
        },
        {
          name: 'def',
          years: '4',
        },
      ],
    };

    comments = {
      data: [
        {
          content: 'abc',
        },
      ],
    };
  });

  it('should render correctly with no props', () => {
    const component = shallow(<Experience />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly with job prop', () => {
    mock.onGet('/api/v1/experiences/1/skills').reply(200, {skills: skills});
    mock.onGet('/api/v1/experiences/1/comments').reply(200, {comments: comments});

    const component = shallow(<Experience job={job} />);
    expect(component).toMatchSnapshot();
  });
});
