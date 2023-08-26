import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthenticationComponent() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="authentication-component">
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <a
        href="#"
        onClick={() => setIsLogin(!isLogin)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "5px",
        }}
      >
        {isLogin ? "Register" : "Login"}
      </a>
    </div>
  );
}
