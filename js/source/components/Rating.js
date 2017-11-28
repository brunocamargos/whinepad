import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: props.defaultValue,
      tmpRating: props.defaultValue,
    };
  }

  getValue() {
    return this.state.rating;
  }

  setTemp(rating) {
    this.setState({ tmpRating: rating });
  }

  setRating(rating) {
    this.setState({
      tmpRating: rating,
      rating: rating,
    });
  }

  reset() {
    this.setTemp(this.state.rating);
  }

  componentWillReceiveProps(nextProps) {
    this.setRating(nextProps.defaultValue);
  }

  getRatingItem(className, key) {
    return !this.props.readonly
      ? <span
        className={className}
        key={key}
        onClick={this.setRating.bind(this, key)}
        onMouseOver={this.setTemp.bind(this, key)}
      >
        &#9734;
      </span>
      : <span
        className={className}
        key={key}
      >
        &#9734;
      </span>;
  }

  render() {
    const stars = [];
    for (let i = 1; i <= this.props.max; i++) {
      stars.push(this.getRatingItem(classNames({ RatingOn: i <= this.state.tmpRating }), i));
      // const className = classNames({ RatingOn: i <= this.state.tmpRating });
      // stars.push((!this.props.readonly
      //   ? <span
      //     className={className}
      //     key={i}
      //     onClick={this.setRating.bind(this, i)}
      //     onMouseOver={this.setTemp.bind(this, i)}
      //   >
      //     &#9734;
      //     </span>
      //   : <span
      //     className={className}
      //     key={i}
      //   >
      //     &#9734;
      //     </span>));
    }

    return (
      <div
        className={
          classNames({
            Rating: true,
            RatingReadonly: this.props.readonly,
          })
        }
        onMouseOut={this.reset.bind(this)}
      >
        {stars}
        {
          this.props.readonly || !this.props.id
            ? null
            : <input
              type="hidden"
              id={this.props.id}
              value={this.state.rating} />
        }
      </div>
    );
  }

}

Rating.propTypes = {
  defaultValue: PropTypes.number,
  readonly: PropTypes.bool,
  max: PropTypes.number,
}

Rating.defaultProps = {
  defaultValue: 0,
  max: 5,
}

export default Rating;
