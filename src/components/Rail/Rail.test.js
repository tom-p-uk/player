import React from 'react';
import { mount } from 'enzyme';
import Rail from './Rail';
import railsData from '../../../data/rails.json';
import * as createNextRailState from './createNextRailState';
import { expect } from 'chai';
import { spy, stub } from 'sinon';

describe('<Rail />', () => {
  const data = railsData[0];
  let createNextRailStateSpy;

  before(() => {
    createNextRailStateSpy = spy(createNextRailState, 'default');
    stub(window, 'getComputedStyle').returns({ width: 90, marginRight: 10 });
  });

  beforeEach(() => {
    createNextRailStateSpy.resetHistory();
  });

  after(() => {
    window.getComputedStyle.restore();
  });

  it('calls createNextRailState with correct args when right button is clicked', () => {
    const wrapper =  mount(<Rail { ...data } />);

    createNextRailStateSpy.resetHistory();

    wrapper.find('[data-test-id="rail-button-right"]').simulate('click');

    const [prevState, nextState] = createNextRailStateSpy.args[0];

    expect(nextState.index).to.be.above(prevState.index);
  });

  it('calls createNextRailState with correct args when left button is clicked', () => {
    const wrapper =  mount(<Rail { ...data } />);

    wrapper.find('[data-test-id="rail-button-right"]').simulate('click');

    createNextRailStateSpy.resetHistory();

    wrapper.find('[data-test-id="rail-button-left"]').simulate('click');

    const [prevState, nextState] = createNextRailStateSpy.args[0];

    expect(nextState.index).to.be.below(prevState.index);
  });
});
