import React from "react";
import "./AppHeader.css";
import { SearchProduct } from "../SearchProduct/SearchProduct";

export default function AppHeader({ text, onSearch }) {
  return (
    <>
      <h2 className="app-header">{text}</h2>;
      <SearchProduct onSearch={onSearch} />
    </>
  );
}
