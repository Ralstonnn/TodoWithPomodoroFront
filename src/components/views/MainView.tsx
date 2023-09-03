import React from "react";
import "../../style/views/main-view.scss";
import Header from "../layout/Header";
import { Outlet } from "react-router-dom";

export default function MainView() {
  return (
    <>
      <Header />
      <div className="main-view">
        <Outlet />
      </div>
    </>
  );
}
