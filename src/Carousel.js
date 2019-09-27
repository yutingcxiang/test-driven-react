import React from 'react';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';
import PropTypes from 'prop-types';
import HasIndex from './HasIndex';
import AutoAdvances from './AutoAdvances';

export class Carousel extends React.PureComponent {
  state = {
    slideIndex: 0,
  };

  static propTypes = {
    defaultImg: CarouselSlide.propTypes.Img,
    defaultImgHeight: CarouselSlide.propTypes.imgHeight,
    slideIndex: PropTypes.number.isRequired,
    slideIndexIncrease: PropTypes.func.isRequired,
    slideIndexDecrease: PropTypes.func.isRequired,
    slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes)).isRequired,
  }

  static defaultProps = {
    defaultImg: CarouselSlide.defaultProps.Img,
    defaultImgHeight: CarouselSlide.defaultProps.imgHeight,
  };

  decreaseIndex = () => {
    // this.setState({ slideIndex: this.state.slideIndex - 1 })
    const { slideIndexDecrease, slides } = this.props;
    slideIndexDecrease(slides.length);
  }

  increaseIndex = () => {
    const { slideIndexIncrease, slides } = this.props;
    slideIndexIncrease(slides.length);
  }

  render() {
    const { defaultImg, defaultImgHeight, slideIndex, slideIndexDecrese: _slideIndexDecrease, slideIndexIncrease: _slideIndexIncrease, slides, ...rest } = this.props;
    return <div {...rest}>
      <CarouselSlide Img={defaultImg} imgHeight={defaultImgHeight} {...slides[slideIndex]} />
      <CarouselButton data-action='prev' onClick={this.decreaseIndex}>Prev</CarouselButton>
      <CarouselButton data-action='next' onClick={this.increaseIndex}>Next</CarouselButton>
    </div>;
  }
}

export default HasIndex(AutoAdvances(Carousel, 'slideIndex'), 'slideIndex');