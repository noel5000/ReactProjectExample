import React, { Component } from "react";
const Select = ({ name, label, error, options, dataType, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className="form-control" id={name} name={name} {...rest}>
        <option value="">Choose...</option>
        {options.map((option, index) => (
          <option key={index} value={option[dataType.value]}>
            {option[dataType.name]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
