import { createContext } from "react";

export const Themes = {
  dark: "dark",
  light: "light",
};

const initialState = {
  Themes: Themes.light,
  leTheme: () => {},
};

export const ThemeContext = createContext(initialState);
