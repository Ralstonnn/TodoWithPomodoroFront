import "../../style/views/landing.scss";
import React from "react";
import AuthenticationComponent from "../landing/AuthenticationComponent";

export default function LandingView() {
  return (
    <div className="landing-view">
      <AuthenticationComponent />
    </div>
  );
}
