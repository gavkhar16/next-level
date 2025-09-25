import React from "react";
import "./ProductCard.css";

export const ProductCard = ({ name, price, image,  }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <h4 className="product-title">{name}</h4>
      <p className="product-price">${price}</p>
      {/* <button className="delete" onClick={onDelete}>
        Удалить
      </button> */}
    </div>
  );
};
