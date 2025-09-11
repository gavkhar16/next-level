import React, { useState } from "react";
import './SearchProduct.css'

export  const SearchProduct = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value); // отправляем наверх, чтобы MainPage знал о поиске
  };

  return (
    <input
      type="text"
      placeholder="Введите название товара..."
      className="search"
      value={searchQuery}
      onChange={handleChange}
    />
  );
};
