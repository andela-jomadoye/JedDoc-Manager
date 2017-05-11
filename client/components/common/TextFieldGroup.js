import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({ field, value, label, error,
        type, onChange, checkUserExists, materialIcon }) => (
        <div className="row">
          <div className="input-field col s8 offset-m2">
            <i className="material-icons prefix">{materialIcon}</i>
            <input
              type={type}
              name={field}
              value={value}
              onChange={onChange}
              onBlur={checkUserExists}
              className=
              {classnames('validate', { invalid: error }, { valid: !error })} />
              {error &&
              <span className="red">
                {error}
              </span>
              }
            <label htmlFor={field}>{label}</label>
          </div>
        </div>
  );

TextFieldGroup.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  materialIcon: React.PropTypes.string,
  error: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  checkUserExists: React.PropTypes.func,
};

TextFieldGroup.defaultProps = {
  type: 'text',
};

export default TextFieldGroup;
