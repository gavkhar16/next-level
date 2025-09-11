import React, { useContext } from "react";
import "./PageContainer.css";
import { ThemeContext, Themes } from "../../pages/context/ThemeContext";

export default function PageContainer({ children }) {
  const {theme} = useContext(ThemeContext)
  
  return (
    <div className={`page-container ${theme === Themes.dark ? "page-container_dark" : ""}`}>
      <div className="auth-card">{children}</div>
    </div>
  );
}
