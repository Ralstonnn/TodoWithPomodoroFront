import React from "react";
import Container from "../common/Container";
import Header from "../layout/Header";
import { Outlet } from "react-router-dom";

export default function MainView() {
  return (
    <Container>
      <Header />
      <div className="main-view">
        asfdasfasfasfasfasdf
        <Outlet />
      </div>
    </Container>
  );
}
