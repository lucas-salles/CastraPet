import React from "react";

import "./input.css";

const Input = ({ label, type, name, value, onChange, ...props }) => {
  return (
    <div id="input">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Input;
