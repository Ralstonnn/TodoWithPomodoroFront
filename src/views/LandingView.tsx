import "../style/views/landing.scss";
import React, { useState } from "react";
import AuthenticationComponent from "../components/landing/AuthenticationComponent";

export default function LandingView() {
  return (
    <div className="landing-view">
      <AuthenticationComponent />
    </div>
  );
}
