import React, { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect запустился");
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => {
        console.log("API response:", data); // 👈 посмотри, что приходит
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Ошибка загрузки:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка данных...</p>;

  return (
    <div>
      <h1>Список продуктов:</h1>
      {products.map(p => (
        <p key={p.id}>
          {p.title} — рейтинг: {p.rating}, stock: {p.stock}, reviews: {p.reviews}
        </p>
      ))}
    </div>
  );
}
