import React from 'react';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';
import PropTypes from 'prop-types';

export default class Carousel extends React.PureComponent {
  state = {
    slideIndex: 0,
  };

  static propTypes = {
    defaultImgHeight: CarouselSlide.propTypes.imgHeight,
    slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes)).isRequired,
  }

  static defaultProps = {
    defaultImgHeight: CarouselSlide.defaultProps.imgHeight,
  };

  decreaseIndex = () => {
    // this.setState({ slideIndex: this.state.slideIndex - 1 })
    const { slides } = this.props;
    this.setState(({ slideIndex }) => ({ slideIndex: (slideIndex - 1) % slides.length }))
  }

  increaseIndex = () => {
    const { slides } = this.props;
    this.setState(({ slideIndex }) => ({ slideIndex: (slideIndex + 1) % slides.length }))
  }

  render() {
    const { defaultImgHeight, slides, ...rest } = this.props;
    return <div {...rest}>
      <CarouselSlide imgHeight={defaultImgHeight} {...slides[this.state.slideIndex]} />
      <CarouselButton data-action='prev' onClick={this.decreaseIndex}>Prev</CarouselButton>
      <CarouselButton data-action='next' onClick={this.increaseIndex}>Next</CarouselButton>
    </div>;
  }
}
