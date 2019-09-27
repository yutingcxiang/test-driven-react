import React from 'react';
import { shallow } from 'enzyme';
import HasIndex from '../HasIndex';
import { exportAllDeclaration } from '@babel/types';

describe('HasIndex', () => {
  const MockComponent = () => null;
  MockComponent.displayName = 'MockComponent';
  const MockComponentWithIndex = HasIndex(MockComponent, 'index');

  it('has the expected displayName', () => {
    expect(MockComponentWithIndex.displayName).toBe(`HasIndex(MockComponent)`);
  });

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MockComponentWithIndex />)
  });

  it('has an initial index state equal to defaultIndex prop', () => {
    expect(wrapper.state('index')).toBe(0);
    const wrapper2 = shallow(<MockComponentWithIndex defaultIndex={1} />);
    expect(wrapper2.state('index')).toBe(1);
  })

  it('always has index state equal to the index prop', () => {
    const wrapperWithInitialIndex = shallow(<MockComponentWithIndex index={1} />);
    expect(wrapperWithInitialIndex.state('index')).toBe(1);
    wrapper.setProps({ index: 2 });
    expect(wrapper.state('index')).toBe(2);
  })
  
  it('allows `index` state to change if the `index` prop is unset', () => { //(3)
    const wrapperWithInitialIndex = shallow(
      <MockComponentWithIndex index={1} />
    );
    wrapperWithInitialIndex.setProps({ index: undefined });
    wrapperWithInitialIndex.setState({ index: 3 });
    expect(wrapperWithInitialIndex.state('index')).toBe(3);
  });

  it('calls onIndexChange on increase/decrease', () => {
    const onIndexChange = jest.fn()
    wrapper.setProps({ index: 0, onIndexChange});
    wrapper.prop('indexDecrease')(3);
    expect(onIndexChange).toHaveBeenCalledWith({ target: { value: 2 }});
    wrapper.prop('indexIncrease')(3);
    expect(onIndexChange).toHaveBeenCalledWith({ target: { value: 1}});
  })

  it('passes down index state as prop', () => {
    expect(wrapper.prop('index')).toBe(0);
    wrapper.setState({ index: 1 });
    expect(wrapper.prop('index')).toBe(1);
  })

  describe('indexDecrease', () => {
    it('decreases index to max if index is 0', () => {
      wrapper.setState({ index: 0 });
      wrapper.prop('indexDecrease')(3);
      expect(wrapper.state('index')).toBe(2);
    });

    it('decreases index by 1', () => {
      wrapper.setState({ index: 3 });
      wrapper.prop('indexDecrease')();
      expect(wrapper.prop('index')).toBe(2);
    });
  });

  describe('indexIncrease', () => {
    it('increases index to min if index is max', () => {
      wrapper.setState({ index: 2 });
      wrapper.prop('indexIncrease')(3);
      expect(wrapper.state('index')).toBe(0);
    });

    it('increases index by 1', () => {
      wrapper.setState({ index: 0 });
      wrapper.prop('indexIncrease')();
      expect(wrapper.prop('index')).toBe(1);
    });
  });
});