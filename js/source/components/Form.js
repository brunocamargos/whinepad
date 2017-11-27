import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';
import FormInput from './FormInput';

class Form extends Component {

  getData() {
    return this.props.fields.reduce((acc, cur) => {
      acc[cur.id] = this.refs[cur.id].getValue();
      return acc;
    }, {});
  }

  render() {
    return (
      <form className="Form"> {this.props.fields.map(field => {
        const prefilled = this.props.initialData && this.props.initialData[field.id];
        if (!this.props.readonly) {
          return (
            <div className="FormRow" key={field.id}>
              <label className="FormLabel" htmlFor={field.id}> {field.label}:</label>
              <FormInput {...field} ref={field.id} defaultValue={prefilled} />
            </div>
          );
        }

        if (!prefilled) {
          return null;
        }

        return (
          <div className="FormRow" key={field.id}>
            <span className="FormLabel"> {field.label}:</span>
            {
              field.type === 'rating'
                ? <Rating readonly={true} defaultValue={parseInt(prefilled, 10)} />
                : <div>{prefilled}</div>
            }
          </div>
        );
      }, this)}
      </form>
    );
  }

}

Form.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  initialData: PropTypes.object,
  readonly: PropTypes.bool,
}

export default Form;
