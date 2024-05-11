import React from "react";

const ButtonRadio = ({
  label,
  value,
  isSelected,
  onClick,
  content,
  isContent,
}) => {
  return (
    <div
      className={`btn flex justify-start h-fit gap-4 ${
        isSelected ? "btn-accent" : ""
      }`}
      onClick={() => onClick(value)}
    >
      <input
        type="radio"
        name="paymentOptions"
        value={value}
        className={`radio ${isSelected ? "radio-accent" : ""}`}
        checked={isSelected}
        onChange={() => onChange(value)}
      />
      {label}
    </div>
  );
};
export default ButtonRadio;
