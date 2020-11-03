import React from "react";

import "./radio.css";

const Radio = ({ options, value, name, onChange, ...props }) => {
  return (
    <div id="radio">
      {options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={onChange}
            {...props}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default Radio;
