import React from 'react';

export default(Component, indexPropName) => 
  class ComponentWithIndex extends React.PureComponent {
    static displayName = `HasIndex(${Component.displayName || Component.name })`;

    state = { index: 0 }
    
    indexDecrease = upperBound => {
      // this.setState({ slideIndex: this.state.slideIndex - 1 })
      this.setState(({ index }) => {
        const newIndex = upperBound ? (index + upperBound - 1) % upperBound : index - 1;
        return { index: newIndex }
      });
    };
  
    indexIncrease = upperBound => {
      this.setState(({ index }) => {
        const newIndex = upperBound ? (index + 1) % upperBound : index + 1;
        return { index: newIndex }
      });
    }

    render() {
      const indexProps = {
        [indexPropName] : this.state.index,
        [`${indexPropName}Increase`]: this.indexIncrease,
        [`${indexPropName}Decrease`]: this.indexDecrease,
      }
      return <Component {...this.props} {...indexProps} />;
    }
  };