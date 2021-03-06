import React from 'react';
import { shallow } from 'enzyme';
import AutoAdvances from '../AutoAdvances';

describe('AutoAdvances()', () => {
  const MockComponent = () => null;
  MockComponent.displayName = 'MockComponent';
  const MockComponentWithAutoAdvance = AutoAdvances(MockComponent, 'index', 'upperBound');

  it('has the expected displayName', () => {
    expect(MockComponentWithAutoAdvance.displayName).toBe('AutoAdvances(MockComponent)');
  })

  const autoAdvanceDelay = 10e3;
  const upperBound = 5;
  let indexIncrease;
  let wrapper;

  beforeEach(() => {
    indexIncrease = jest.fn();
    jest.useFakeTimers();
    wrapper = shallow(<MockComponentWithAutoAdvance autoAdvanceDelay={autoAdvanceDelay} index={0} indexIncrease={indexIncrease} upperBound={upperBound} />)
  })

  it('calls the increment function after autoAdvanceDelay', () => {
    jest.advanceTimersByTime(autoAdvanceDelay);
    expect(indexIncrease).toHaveBeenCalledWith(upperBound);
  })

  it('uses upperBound.length if upperBound is an array', () => {
    wrapper.setProps({ upperBound: [1,2,3] });
    jest.advanceTimersByTime(autoAdvanceDelay);
    expect(indexIncrease).toHaveBeenCalledWith(3);
  });

  it('does not set a timer if autoAdvanceDelay is 0', () => {
    wrapper.setProps({ index: 1, autoAdvanceDelay: 0 });
    jest.advanceTimersByTime(999999);
    expect(indexIncrease).not.toHaveBeenCalled();
  })

  it('resets the timer when the target prop changes', () => {
    jest.advanceTimersByTime(autoAdvanceDelay - 1);
    wrapper.setProps({ index: 1 });
    jest.advanceTimersByTime(1);
    expect(indexIncrease).not.toHaveBeenCalled();
    jest.advanceTimersByTime(autoAdvanceDelay);
    expect(indexIncrease).toHaveBeenCalled();
  })

  it('clears timers on unmount', () => {
    wrapper.unmount();
    jest.advanceTimersByTime(autoAdvanceDelay);
    expect(indexIncrease).not.toHaveBeenCalled();
  })
})