import "../../style/landing/login-form.scss";
import React, { FormEvent, useState } from "react";
import TextInputComponent from "../common/TextInputComponent";
import ButtonComponent from "../common/ButtonComponent";
import api from "../../api";
import { NavLink, useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import ComponentOverlayPreloader from "../common/ComponentOverlayPreloader";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetInputs = () => {
    setUsername("");
    setPassword("");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.length || !password.length) {
      resetInputs();
      return;
    }
    setLoading(true);
    const response = await api.user.login({ username, password });
    if (response.success) {
      resetInputs();
      userService.user.profile = response.data.profile;
      userService.user.token = response.data.token;
      userService.saveUserData();
      setLoading(false);
      navigate("/", { replace: true });
    } else if (response.error) {
      alert(response.message);
    }
    setLoading(false);
  };

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <h1>Login</h1>
      <div className="login-form__inputs-container">
        <TextInputComponent
          placeholder="Login"
          value={username}
          disabled={loading}
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            setUsername((e.target as HTMLInputElement).value)
          }
        />
        <TextInputComponent
          placeholder="Password"
          type="password"
          value={password}
          disabled={loading}
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            setPassword((e.target as HTMLInputElement).value)
          }
        />
      </div>
      <ButtonComponent type="submit" text="Login" disabled={loading} />
      <NavLink
        to="/auth/register"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "5px",
        }}
      >
        Register
      </NavLink>

      {loading && <ComponentOverlayPreloader />}
    </form>
  );
}
