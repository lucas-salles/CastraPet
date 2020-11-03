import React from "react";

import "./textarea.css";

const TextArea = ({ label, name, ...props }) => {
  return (
    <div id="textarea">
      <label htmlFor={name}>{label}</label>
      <textarea name={name} id={name} {...props} />
    </div>
  );
};

export default TextArea;
