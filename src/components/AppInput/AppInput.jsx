import React from "react";
import "./AppInput.css";

export default function AppInput({
  labelText,
  errorText,
  inputPlaceholder,
  inputType = "text",
  id,
  labelValue,
  isRequired = false,
  labelChange = () => {},
  hasError = false,
  autoComplete,
}) {
  return (
    <label className={`input-wrapper ${hasError ? "_error" : ""}`} htmlFor={id}>
      {labelText}

      <input
        id={id}
        name={id}
        type={inputType}
        placeholder={inputPlaceholder}
        value={labelValue}
        onChange={(e) => labelChange(e.target.value)}
        required={isRequired}
        autoComplete={autoComplete}
        className="app-input"
      />

      <span id="error-message">{errorText}</span>
    </label>
  );
}
