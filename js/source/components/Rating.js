import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: props.defaultValue,
      tmpRating: props.defaultValue
    };
  }

  getValue() {
    return this.state.rating;
  }

  setTemp(rating) {
    if (this.props.readonly)
      return null;

    this.setState({ tmpRating: rating });
  }

  setRating(rating) {
    if (this.props.readonly)
      return null;

    this.setState({
      tmpRating: rating,
      rating: rating
    });
  }

  reset() {
    this.setTemp(this.state.rating);
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps: ', nextProps)
    this.setRating(nextProps.defaultValue);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Rating should update?')
    console.log('shouldComponentUpdate nextProps: ', nextProps)
    console.log('shouldComponentUpdate nextState: ', nextState)
    // return !nextProps.readonly;
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Rating updated!')
    console.log('componentDidUpdate prevProps: ', prevProps)
    console.log('componentDidUpdate prevState: ', prevState)
  }

  render() {
    const stars = [];
    for (let i = 1; i <= this.props.max; i++) {
      stars.push(
        <span
          className={classNames({ RatingOn: i <= this.state.tmpRating })}
          key={i}
          onClick={this.setRating.bind(this, i)}
          onMouseOver={this.setTemp.bind(this, i)}
        >
          &#9734;
        </span>);
    }

    return (
      <div
        className={classNames({
          Rating: true,
          RatingReadonly: this.props.readonly
        })}
        onMouseOut={this.reset.bind(this)}
      >
        {stars}
        {/* {console.log('this.props.readonly: ', this.props.readonly)}
        {console.log('this.props.id: ', this.props.id)}
        {
          this.props.readonly || !this.props.id
            ? null
            : <input
              type="hidden"
              id={this.props.id}
              value={this.state.rating} />
        } */}
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
