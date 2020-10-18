import React from "react";

import "./input.css";

const Input = ({ label, type, name, value, onChange, onBlur }) => {
  return (
    <div id="input">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Input;
