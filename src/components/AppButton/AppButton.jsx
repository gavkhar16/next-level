import React from "react";
import "./AppButton.css";

export default function AppButton({ text, onClick, disabled }) {
  return (
    <button className="app-button" onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}
