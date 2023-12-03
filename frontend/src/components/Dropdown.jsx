import React from "react";

const Dropdown = ({
  onInputChange,
  selectedValue,
  label,
  name,
  options,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label} :{" "}</label>
      <select style={{width: '200px'}}
        name={name}
        value={selectedValue}
        onChange={onInputChange}
        id={name}
      >
        {options.map((option) => (
          <option key={option.value} name={name} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
