import React from 'react';
import { shallow } from 'enzyme';
import Carousel from '../Carousel';
import CarouselButton from '../CarouselButton';
import CarouselSlide from '../CarouselSlide';

describe('Carousel', () => {
  let wrapper;

  const slides = [
      {
        imgUrl: 'https://example.com/slide1.png',
        description: 'Slide 1',
        attribution: 'Uno Pizzeria',
      },
      {
        imgUrl: 'https://example.com/slide2.png',
        description: 'Slide 2',
        attribution: 'Dos Equis',
      },
      {
        imgUrl: 'https://example.com/slide3.png',
        description: 'Slide 3',
        attribution: 'Three Amigos',
      },
    ];

  beforeEach(() => {
    wrapper = shallow(<Carousel slides={slides} />);
  });

  it('renders a <div>', () => {
    expect(wrapper.type()).toBe('div');
  });

  describe('Prev button', () => {
    it('renders a CarouselButton labeled "Prev"', () => {
      expect(
        wrapper.find(CarouselButton).at(0).prop('children')
      ).toBe('Prev');
    });
  
    it('decrements "slideIndex" when prev is clicked', () => {
      wrapper.setState({ slideIndex: 1 });
      wrapper.find('[data-action="prev"]').simulate('click');
      expect(wrapper.state('slideIndex')).toBe(0);
    })  

    it('next wraps "slideIndex" to the max when prev is clicked on first slide', () => {
      wrapper.setState({ slideIndex: 0 });
      wrapper.find('[data-action="prev"]').simulate('click');
      expect(wrapper.state('slideIndex')).toBe(slides.length-1);
    })
  })

  describe('Next button', () => {
    it('renders a CarouselButton labeled "Next"', () => {
      expect(
        wrapper.find(CarouselButton).at(1).prop('children')
      ).toBe('Next');
    });
  
    it('increments "slideIndex" when next is clicked', () => {
      wrapper.setState({ slideIndex: 1 });
      wrapper.find('[data-action="next"]').simulate('click');
      expect(wrapper.state('slideIndex')).toBe(2);
    })  

    it('next wraps "slideIndex" to the first when next is clicked on last slide', () => {
      wrapper.setState({ slideIndex: slides.length - 1 });
      wrapper.find('[data-action="next"]').simulate('click');
      expect(wrapper.state('slideIndex')).toBe(0);
    })
  })

  describe('Slide Display', () => {
    it('renders the current slide as a CarouselSlide', () => {
      let slideProps;
      slideProps = wrapper.find(CarouselSlide).props();
      expect(slideProps).toEqual({
        ...CarouselSlide.defaultProps,
        ...slides[0],
      });
      wrapper.setState({ slideIndex: 1 });
      slideProps = wrapper.find(CarouselSlide).props();
      expect(slideProps).toEqual({
        ...CarouselSlide.defaultProps,
        ...slides[1],
      });
    })
  })
});