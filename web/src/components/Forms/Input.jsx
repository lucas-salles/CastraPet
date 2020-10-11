import React from "react";

import "./Input.css";

const Input = ({ label, type, name, value, onChange, onBlur }) => {
  return (
    <div className="input">
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
