import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUserToDB } from "../Utils/App";
import { MainText } from '../components/MainText/MainText';
import AppInput from "../components/AppInput/AppInput";
import AppButton from "../components/AppButton/AppButton";
import AppHeader from "../components/AppHeader/AppHeader";
import PageContainer from "../components/PageContainer/PageContainer";
import LinkText from "../components/LinkText/LinkText";
import ChangeTheme from "../components/ChangeTheme/ChangeTheme";


export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError(""); // Очищаем ошибку при изменении поля
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 1. Регистрируем пользователя
      const result = await saveUserToDB(formData);

      // 2. Если успешно - показываем сообщение и переходим
      console.log("Регистрация успешна:", result);

      // 3. Сохраняем пользователя как текущего
      localStorage.setItem("current_user", JSON.stringify(result.user));

      // 4. Переходим на главную страницу
      navigate("/mainpage", {
        state: { message: "Регистрация прошла успешно!" },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <MainText text="Регистрация"/>
      <form onSubmit={handleSubmit}>
        <AppInput
          inputPlaceholder="Введите ваше имя"
          value={formData.name}
          labelChange={(value) => handleInputChange("name", value)}
          isRequired
        />

        <AppInput
          inputPlaceholder="Введите ваш email"
          value={formData.email}
          labelChange={(value) => handleInputChange("email", value)}
          inputType="email"
          isRequired
        />

        <AppInput
          inputPlaceholder="Придумайте пароль"
          value={formData.password}
          labelChange={(value) => handleInputChange("password", value)}
          inputType="password"
          isRequired
        />

        {error && <div style={{ color: "red", margin: "10px 0" }}>{error}</div>}

        <AppButton
          type="submit"
          text={isLoading ? "Регистрация..." : "Зарегистрироваться"}
          disabled={
            isLoading || !formData.name || !formData.email || !formData.password
          }
        />
      </form>

      <LinkText text="Уже есть аккаунт? Войти" to="/" />
      <ChangeTheme />
    </PageContainer>
  );
};
