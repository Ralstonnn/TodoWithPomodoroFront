import React from "react";
import ReactDOM from "react-dom/client";
import "./style/base.scss";
import userService from "./services/userService";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

userService.initUserData();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
