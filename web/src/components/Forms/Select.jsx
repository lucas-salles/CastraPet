import React from "react";

import "./select.css";

const Select = ({
  options,
  value,
  messageDisabled,
  label,
  name,
  onChange,
  ...props
}) => {
  return (
    <div id="select">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      >
        <option value="" disabled>
          {messageDisabled ? messageDisabled : "Selecione"}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
