import React, { useEffect, useMemo, useState } from "react";
import { ThemeContext, Themes } from "./ThemeContext";

export const ThemeProvider = ({ children }) => {
  const [themeValue, setThemeValue] = useState(Themes.light);

  useEffect(() => {
    const presistedTheme = JSON.parse(localStorage.getItem("currentTheme"));
    if (presistedTheme) {
      setThemeValue(presistedTheme);
    }
  }, []);
  ///Подключение темы и сохранение в localSosaga
  const toggleTheme = () => {
    setThemeValue((prev) => {
      let newTheme = prev === Themes.light ? Themes.dark : Themes.light;
      localStorage.setItem("currentTheme", JSON.stringify(newTheme));
      return newTheme;
    });
  };
  ///оптимизирует наше значение через useMemo
  const contextValue = useMemo(() => {
    return {
        
      theme: themeValue,
      toggleTheme,
    };
  }, [themeValue]);
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
