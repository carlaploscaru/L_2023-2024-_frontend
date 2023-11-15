import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import AuthenticationPage, { action as authAction } from "./pages/Authentication";
import HomePage from "./pages/Home";
import ConfirmPage, { action as confirmAction } from "./pages/Confirmation";
import { action as logoutAction } from "./pages/Logout";
import { tokenLoader } from "./utils/auth";
import RecoverPasswordPage, { action as resetAction } from "./pages/RecoverPassword";
import ErrorPage from "./pages/Error";
import PropertiesRootLayout from "./pages/PropertiesRoot";
import PropertiesPage from "./pages/Properties";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement:<ErrorPage/>,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "properties",
        element: <PropertiesRootLayout />,
        children: [
          {
            index: true,
            element: <PropertiesPage />
          }
        ],
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction
      },
      {
        path: "confirm",
        element: <ConfirmPage />,
        action: confirmAction
      },
      {
        path: "recover-password",
        element: <RecoverPasswordPage />,
        action: resetAction
      },
      {
        path: "logout",
        action: logoutAction
      }
    ]
  },
]);


const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
