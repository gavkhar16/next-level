import React from "react";
import "./PageContainer.css";

export default function PageContainer({ children }) {
  return (
    <div className="page-container">
      <div className="auth-card">{children}</div>
    </div>
  );
}
