import React from 'react';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';
import PropTypes from 'prop-types';

class Carousel extends React.PureComponent {
  state = {
    slideIndex: 0,
  };

  static propTypes = {
    slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes)).isRequired,
  }

  decreaseIndex = () => {
    // this.setState({ slideIndex: this.state.slideIndex - 1 })
    const { slides } = this.props;
    if (this.state.slideIndex === 0) {
      this.setState(({ slideIndex }) => ({ slideIndex: slides.length - 1 }))
    } else {
      this.setState(({ slideIndex }) => ({ slideIndex: slideIndex - 1 }))
    }
  }

  increaseIndex = () => {
    const { slides } = this.props;
    this.setState(({ slideIndex }) => ({ slideIndex: (slideIndex + 1) % slides.length }))
  }

  render() {
    const { slides, ...rest } = this.props;
    return <div {...rest}>
      <CarouselButton data-action='prev' onClick={this.decreaseIndex}>Prev</CarouselButton>
      <CarouselButton data-action='next' onClick={this.increaseIndex}>Next</CarouselButton>
      <CarouselSlide {...slides[this.state.slideIndex]} />
    </div>;
  }
}

// Carousel.propTypes = {
//   slides: PropTypes.arrayOf(PropTypes.shape({
//     imgUrl: PropTypes.string.isRequired,
//     description: PropTypes.node.isRequired,
//     attribution: PropTypes.node,
//   })),
// }

export default Carousel;