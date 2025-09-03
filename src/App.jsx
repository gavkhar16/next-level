import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { MainPage } from "./pages/MainPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/registerpage",
    element: <RegisterPage />,
  },{
    path: "/mainpage",
    element: <MainPage />,
  },
]);

function App() {
  return (
    <>
    <RouterProvider router={routerConfig}/>
    </>
  );
}

export default App;
