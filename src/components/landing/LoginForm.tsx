import "../../style/landing/login-form.scss";
import React, { FormEvent, useState } from "react";
import TextInputComponent from "../common/TextInputComponent";
import ButtonComponent from "../common/ButtonComponent";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    const response = await api.user.login({ username, password });
    if (response.success) {
      resetInputs();
      userService.user.profile = response.data.profile;
      userService.user.token = response.data.token;
      userService.saveUserData();
      navigate("/", { replace: true });
    } else if (response.error) {
      alert(response.message);
    }
    resetInputs();
  };

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <h1>Login</h1>
      <div className="login-form__inputs-container">
        <TextInputComponent
          placeholder="Login"
          value={username}
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            setUsername((e.target as HTMLInputElement).value)
          }
        />
        <TextInputComponent
          placeholder="Password"
          type="password"
          value={password}
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            setPassword((e.target as HTMLInputElement).value)
          }
        />
      </div>
      <ButtonComponent type="submit" text="Login" />
    </form>
  );
}
