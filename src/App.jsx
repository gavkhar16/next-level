import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { MainPage } from "./pages/MainPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./pages/context/ThemeProvider";
import { MainPageTest } from "./pages/MainPageTest";

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/registerpage",
    element: <RegisterPage />,
  },
  {
    path: "/mainpage",
    element: <MainPage />,
  },
  { path: "/test", 
    element: <MainPageTest /> },
]);

function App() {
  return (
    <ThemeProvider>
      <>
        <RouterProvider router={routerConfig} />
      </>
    </ThemeProvider>
  );
}

export default App;
