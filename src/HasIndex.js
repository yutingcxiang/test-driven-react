import React from 'react';
import PropTypes from 'prop-types';

const capitalize = word => `${word[0].toUpperCase()}${word.slice(1)}`;

export default(Component, indexPropName) => {
  const defaultIndexPropName = `default${capitalize(indexPropName)}`;

  return class ComponentWithIndex extends React.PureComponent {
    static displayName = `HasIndex(${Component.displayName || Component.name })`;

    static propTypes = {
      [indexPropName]: PropTypes.number,
      [defaultIndexPropName]: PropTypes.number,
      onIndexChange: PropTypes.func,
    }

    static defaultProps = { [defaultIndexPropName]: 0 };

    static getDerivedStateFromProps(props, state) {
      if(
        props[indexPropName] != null &&
        props[indexPropName] !== state.index
      ) {
        return { index: props[indexPropName]};
      }
      return null;
    }

    constructor(props){
      super(props);
      this.state = {
        index: props[defaultIndexPropName],
      };
    }
    
    indexDecrease = upperBound => {
      // this.setState({ slideIndex: this.state.slideIndex - 1 })
      const { onIndexChange } = this.props;
      this.setState(({ index }) => {
        const newIndex = upperBound ? (index + upperBound - 1) % upperBound : index - 1;
        if (onIndexChange) {
          onIndexChange({ target: { value: newIndex }});
        }
        return { index: newIndex }
      });
    };
  
    indexIncrease = upperBound => {
      const { onIndexChange } = this.props;
      this.setState(({ index }) => {
        const newIndex = upperBound ? (index + 1) % upperBound : index + 1;
        if (onIndexChange) {
          onIndexChange({ target: { value: newIndex }});
        }
        return { index: newIndex }
      });
    }

    render() {
      const { 
        [defaultIndexPropName]: _defaultIndexProp,
        ...rest
      } = this.props;
      const indexProps = {
        [indexPropName] : this.state.index,
        [`${indexPropName}Increase`]: this.indexIncrease,
        [`${indexPropName}Decrease`]: this.indexDecrease,
      }
      return <Component {...rest} {...indexProps} />;
    }
  };
}