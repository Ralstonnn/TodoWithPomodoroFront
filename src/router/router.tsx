import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainView from "../views/MainView";
import LandingView from "../views/LandingView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Something went wrong</div>,
    children: [
      {
        path: "/",
        element: <MainView />,
      },
      {
        path: "/todo",
        element: <MainView />,
      },
      {
        path: "auth",
        element: <LandingView />,
      },
    ],
  },
]);
