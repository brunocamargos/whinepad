import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';
import Suggest from './Suggest';

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.defaultValue }
  }

  getValue() {
    return 'value' in this.refs.input
      ? this.refs.input.value
      : this.refs.input.getValue();
  }

  render() {
    const commonProps = {
      id: this.props.id,
      ref: 'input',
      defaultValue: this.props.defaultValue,
    };

    switch (this.props.type) {
      case 'year':
        return (
          <input
            {...commonProps}
            type="number"
            defaultValue={this.props.defaultValue || new Date().getFullYear()} />
        );
        break;
      case 'suggest':
        return (
          <Suggest {...commonProps} options={this.props.options} />
        );
        break;
      case 'rating':
        return (
          <Rating {...commonProps} defaultValue={parseInt(this.props.defaultValue, 10)} />
        );
        break;
      case 'text':
        return (
          <textarea {...commonProps} />
        );
        break;
      default:
        return (
          <input type="text" {...commonProps} />
        );
        break;
    }
  }


}

FormInput.propTypes = {
  type: PropTypes.oneOf(['year', 'suggest', 'rating', 'text', 'input']),
  id: PropTypes.string,
  options: PropTypes.array,
  defaultValue: PropTypes.any,
}

export default FormInput;
