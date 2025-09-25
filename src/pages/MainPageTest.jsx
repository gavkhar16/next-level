// Products.jsx
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

export  function MainPageTest() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect запустился");
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => {
        console.log("API response:", data);
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Ошибка загрузки:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка данных...</p>;
  if (!products.length) return <p>Данные не найдены</p>;

  // Линейный график рейтингов
  const ratingOptions = {
    chart: { id: "rating-chart" },
    xaxis: { categories: products.map(p => p.title) },
    title: { text: "Рейтинг продуктов", align: "center" }
  };
  const ratingSeries = [{ name: "Rating", data: products.map(p => p.rating) }];

  // Столбчатый график запасов
  const stockOptions = {
    chart: { id: "stock-chart" },
    xaxis: { categories: products.map(p => p.title) },
    title: { text: "Запасы продуктов", align: "center" }
  };
  const stockSeries = [{ name: "Stock", data: products.map(p => p.stock) }];

  // Круговая диаграмма количества отзывов
  const reviewsOptions = {
    labels: products.map(p => p.title),
    title: { text: "Количество отзывов", align: "center" }
  };
  const reviewsSeries = products.map(p => p.reviews.length);

  return (
    <div>
      <h2>Линейный график рейтингов</h2>
      <Chart options={ratingOptions} series={ratingSeries} type="line" height={350} />

      <h2>Столбчатый график запасов</h2>
      <Chart options={stockOptions} series={stockSeries} type="bar" height={350} />

      <h2>Круговая диаграмма отзывов</h2>
      <Chart options={reviewsOptions} series={reviewsSeries} type="donut" height={350} />
    </div>
  );
}
