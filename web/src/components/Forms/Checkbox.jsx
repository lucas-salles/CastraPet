import React from "react";

import "./checkbox.css";

const Checkbox = ({ options, value, name, setValue, keep, ...props }) => {
  function handleChange({ target }) {
    if (target.checked) {
      if (keep) {
        setValue([...value, target.value]);
      } else {
        setValue([target.value]);
      }
    } else {
      setValue(value.filter((v) => v !== target.value));
    }
  }

  return (
    <div id="checkbox">
      {options.map((option) => (
        <label key={option} htmlFor={name}>
          <input
            id={name}
            type="checkbox"
            name={name}
            value={option}
            checked={value.includes(option)}
            onChange={handleChange}
            {...props}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default Checkbox;
