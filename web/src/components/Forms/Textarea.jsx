import React from "react";

import "./textarea.css";

const TextArea = ({ label, name, value, onChange, ...props }) => {
  return (
    <div id="textarea">
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default TextArea;
