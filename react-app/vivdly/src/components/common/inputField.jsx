import React from 'react';

const Input = ({onChange, value, label, name,placeholder, errors}) => {
  return ( 
    <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
              onChange={onChange}
              value={value}
              name={name}
              type={name}
              className="form-control"
              id={name}
              placeholder={placeholder}
            />
            { errors && <div className="alert alert-danger">{errors}</div>}
          </div>
   );
}
 
export default Input;