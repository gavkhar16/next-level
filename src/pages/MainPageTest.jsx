import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../Utils/App";
import AppHeader from "../components/AppHeader/AppHeader";
import AppButton from "../components/AppButton/AppButton";
import PageContainer from "../components/PageContainer/PageContainer";
import ChangeTheme from "../components/ChangeTheme/ChangeTheme";
import { MainText } from "../components/MainText/MainText";
import { ProductCard } from "../components/ProductCard/ProductCard";

export const MainPageTest = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectCategories, setSelectCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(2);
  const [productsData, setProductsData] = useState([
    {
      id: 1,
      name: "iPhone 14",
      category: "phone",
      price: 1200,
      image: "/public/iPhone 14.jfif",
    },
    {
      id: 2,
      name: "MacBook Pro",
      category: "laptop",
      price: 2500,
      image: "/public/MacBook Pro.jfif",
    },
    {
      id: 3,
      name: "Samsung Galaxy S23",
      category: "phone",
      price: 1000,
      image: "/public/Samsung Galaxy S23.jfif",
    },
    {
      id: 4,
      name: "Lenovo ThinkPad",
      category: "laptop",
      price: 1500,
      image: "/public/Lenovo ThinkPad.jfif",
    },
    {
      id: 5,
      name: "AirPods Pro",
      category: "accessory",
      price: 250,
      image: "/public/AirPods Pro.jfif",
    },
    {
      id: 6,
      name: "iPad Pro",
      category: "tablet",
      price: 1600,
      image: "/public/iPad Pro.jfif",
    },
  ]);

  const handleDeleteTodo = (id) => {
    setProductsData((prevTods) => prevTods.filter((todo) => todo.id !== id));
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  // Все уникальные категории
  const categories = useMemo(
    () => Array.from(new Set(productsData.map((p) => p.category))),
    []
  );

  const toggleCategory = (cat) => {
    setSelectCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  // фильтрация
  const filteredProducts = productsData.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const categoryMatch =
      selectCategories.length === 0
        ? true
        : selectCategories.includes(product.category);
    return nameMatch && categoryMatch;
  });

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct 
  );

  if (!user) {
    return (
      <PageContainer>
        <MainText text="Доступ запрещен" />
        <p>Пожалуйста, войдите или зарегистрируйтесь</p>
        <AppButton text="Войти" onClick={() => navigate("/")} />
      </PageContainer>
    );
  }

  return (
    <>
      <AppHeader
        text={`Добро пожаловать, ${user.name}!`}
        onSearch={setSearchQuery}
      />

      {/* Кнопка для открытия фильтра */}
      <div style={{ margin: "20px 0" }}>
        <AppButton
          text={isFilterOpen ? "Скрыть фильтр" : "Фильтр"}
          onClick={() => setIsFilterOpen((prev) => !prev)}
        />
      </div>

      {/* Выпадающий список фильтра */}
      {isFilterOpen && (
        <div
          style={{
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid gray",
          }}
        >
          <h4>Категории:</h4>
          {categories.map((cat) => (
            <label key={cat} style={{ display: "block" }}>
              <input
                type="checkbox"
                checked={selectCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      )}

      {/* Сетка товаров */}

      {productsData.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          onDelete={() => handleDeleteTodo(product.id)}
        />
      ))}

      <PageContainer>
        <div style={{ margin: "20px 0" }}>
          <h3>Ваши данные:</h3>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Имя:</strong> {user.name}
          </p>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Зарегистрирован:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        <AppButton text="Выйти" onClick={handleLogout} />
        <ChangeTheme />
      </PageContainer>
    </>
  );
};
