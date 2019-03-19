import React, {Component} from 'react';
import {shallow, mount} from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import App from 'App';
import ErrorModal from 'Error';

import {resetUrl} from 'APIUtils';

describe('App test', () => {
  let mock;

  const flushPromises = () => new Promise(resolve => setTimeout(resolve));
  const resetFail = () => mock.onGet(resetUrl).reply(500);
  const resetSucceed = () => mock.onGet(resetUrl).reply(200);

  beforeEach(() => (mock = new MockAdapter(axios)));

  it('should render correctly', () => {
    const component = shallow(<App />);

    expect(component).toMatchSnapshot();
    expect(component.state('countDownTo')).toBeGreaterThan(-1);
  });

  it('should handle reset click', () => {
    const component = shallow(<App />);

    let reset = component.find('Button#reset-button');
    reset.simulate('click');

    expect(component).toMatchSnapshot();
    expect(component.state('loading')).toBe(true);
  });

  it('should handle reset submit and succeed', async () => {
    resetSucceed();
    const component = shallow(<App />);

    let reset = component.find('Button#reset-button');
    reset.simulate('click');
    await flushPromises();
    component.update();

    expect(component).toMatchSnapshot();
    expect(component.state('loading')).toBe(false);
  });

  it('should handle reset submit and fail', async () => {
    resetFail();
    const component = shallow(<App />);

    let reset = component.find('Button#reset-button');
    reset.simulate('click');
    await flushPromises();
    component.update();

    expect(component).toMatchSnapshot();
    expect(component.state('loading')).toBe(false);
    expect(component.state('error')).toBeTruthy();
    expect(component.containsMatchingElement(<ErrorModal />)).toBe(true);
  });
});
