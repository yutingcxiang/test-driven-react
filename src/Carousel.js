import React from 'react';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';
import PropTypes from 'prop-types';

export default class Carousel extends React.PureComponent {
  state = {
    slideIndex: 0,
  };

  static propTypes = {
    defaultImg: CarouselSlide.propTypes.Img,
    defaultImgHeight: CarouselSlide.propTypes.imgHeight,
    slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes)).isRequired,
  }

  static defaultProps = {
    defaultImg: CarouselSlide.defaultProps.Img,
    defaultImgHeight: CarouselSlide.defaultProps.imgHeight,
  };

  decreaseIndex = () => {
    // this.setState({ slideIndex: this.state.slideIndex - 1 })
    const { slides } = this.props;
    this.setState(({ slideIndex }) => ({ slideIndex: (slideIndex + slides.length - 1) % slides.length }))
  }

  increaseIndex = () => {
    const { slides } = this.props;
    this.setState(({ slideIndex }) => ({ slideIndex: (slideIndex + 1) % slides.length }))
  }

  render() {
    const { defaultImg, defaultImgHeight, slides, ...rest } = this.props;
    return <div {...rest}>
      <CarouselSlide Img={defaultImg} imgHeight={defaultImgHeight} {...slides[this.state.slideIndex]} />
      <CarouselButton data-action='prev' onClick={this.decreaseIndex}>Prev</CarouselButton>
      <CarouselButton data-action='next' onClick={this.increaseIndex}>Next</CarouselButton>
    </div>;
  }
}
