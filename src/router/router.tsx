import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainView from "../components/views/MainView";
import LandingView from "../components/views/LandingView";
import TodoLayout from "../components/layout/TodoLayout";
import ScrumBoardLayout from "../components/layout/ScrumBoardLayout";
import LoginForm from "../components/landing/LoginForm";
import RegisterForm from "../components/landing/RegisterForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Something went wrong</div>,
    children: [
      {
        path: "/",
        element: <MainView />,
        children: [
          {
            path: "/",
            element: <TodoLayout />,
          },
          {
            path: "todo",
            element: <TodoLayout />,
          },
          {
            path: "scrum",
            element: <ScrumBoardLayout />,
          },
        ],
      },
      {
        path: "auth",
        element: <LandingView />,
        children: [
          {
            path: "login",
            element: <LoginForm />,
          },
          {
            path: "register",
            element: <RegisterForm />,
          },
        ],
      },
    ],
  },
]);
