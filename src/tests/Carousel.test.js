import React from 'react';
import { mount, shallow } from 'enzyme';
import Carousel, { Carousel as CoreCarousel } from '../Carousel';
import CarouselButton from '../CarouselButton';
import CarouselSlide from '../CarouselSlide';

describe('Carousel', () => {
  describe('component with HOC', () => {
    // let wrapper;
    let mounted;

    beforeEach(() => {
      mounted = mount(<Carousel slides={slides} />);
    });

    it('sets slideIndex={0} on the core component', () => {
      expect(mounted.find(CoreCarousel).prop('slideIndex')).toBe(0);
    });

    it('passes slides down to the core component', () => {
      expect(mounted.find(CoreCarousel).prop('slides')).toBe(slides);
    })

    it('allows slideIndex to be controlled', () => {
      const mounted = mount(<Carousel slides={slides} slideIndex={1} />);
      expect(mounted.find(CoreCarousel).prop('slideIndex')).toBe(1);
      mounted.setProps({ slideIndex: 0 });
      expect(mounted.find(CoreCarousel).prop('slideIndex')).toBe(0);
    });

    it('advances the slide after autoAdvanceDelay elapses', () => {
      jest.useFakeTimers();
      const autoAdvanceDelay = 10e3;
      mounted = mount(<Carousel slides={slides} autoAdvanceDelay={autoAdvanceDelay} />)
      jest.advanceTimersByTime(autoAdvanceDelay);
      mounted.update();
      expect(mounted.find(CoreCarousel).prop('slideIndex')).toBe(1);
    })
  });

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

  describe('core component', () => {
    let wrapper;
    const slideIndexDecrease = jest.fn();
    const slideIndexIncrease = jest.fn();

    beforeEach(() => {
      wrapper = shallow(<CoreCarousel slides={slides} slideIndex={0} slideIndexDecrease={slideIndexDecrease} slideIndexIncrease={slideIndexIncrease} />);
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
        wrapper.find('[data-action="prev"]').simulate('click');
        expect(slideIndexDecrease).toHaveBeenCalledWith(slides.length)
      })  

      // it('next wraps "slideIndex" to the max when prev is clicked on first slide', () => {
      //   wrapper.setState({ slideIndex: 0 });
      //   wrapper.find('[data-action="prev"]').simulate('click');
      //   expect(wrapper.state('slideIndex')).toBe(slides.length-1);
      // })
    })

    describe('Next button', () => {
      it('renders a CarouselButton labeled "Next"', () => {
        expect(
          wrapper.find(CarouselButton).at(1).prop('children')
        ).toBe('Next');
      });
    
      it('increments "slideIndex" when next is clicked', () => {
        wrapper.find('[data-action="next"]').simulate('click');
        expect(slideIndexIncrease).toHaveBeenCalledWith(slides.length);
      })  

      // it('next wraps "slideIndex" to the first when next is clicked on last slide', () => {
      //   wrapper.setState({ slideIndex: slides.length - 1 });
      //   wrapper.find('[data-action="next"]').simulate('click');
      //   expect(wrapper.state('slideIndex')).toBe(0);
      // })
    })

    describe('Slide Display', () => {
      it('renders the current slide as a CarouselSlide', () => {
        let slideProps;
        slideProps = wrapper.find(CarouselSlide).props();
        expect(slideProps).toEqual({
          ...CarouselSlide.defaultProps,
          ...slides[0],
        });
        wrapper.setProps({ slideIndex: 1 });
        slideProps = wrapper.find(CarouselSlide).props();
        expect(slideProps).toEqual({
          ...CarouselSlide.defaultProps,
          ...slides[1],
        });
      })
    })

    it('passes defaultImg and defaultImgHeight to the CarouselSlide', () =>{
      const defaultImg = () => 'test';
      const defaultImgHeight = 1234;
      wrapper.setProps({ defaultImg, defaultImgHeight });
      expect(wrapper.find(CarouselSlide).prop('Img')).toBe(defaultImg);
      expect(wrapper.find(CarouselSlide).prop('imgHeight')).toBe(defaultImgHeight);
    });

    it('allows individual slides to override Img and imgHeight', () => {
      const Img = () => 'test';
      const imgHeight = 1234;
      wrapper.setProps({ slides: [{ ...slides[0], Img, imgHeight }]});
      expect(wrapper.find(CarouselSlide).prop('Img')).toBe(Img);
      expect(wrapper.find(CarouselSlide).prop('imgHeight')).toBe(imgHeight);
    });
  })
});