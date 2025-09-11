import React, { useContext } from "react";
import { ThemeContext, Themes } from "../../pages/context/ThemeContext";
import AppButton from "../AppButton/AppButton";

export default function ChangeTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const buttonText = theme === Themes.dark ? "Светлая тема" : "Тёмная тема";

  return <AppButton text={buttonText} onClick={toggleTheme}/>
}
