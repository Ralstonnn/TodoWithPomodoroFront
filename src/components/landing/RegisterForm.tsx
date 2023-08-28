import TextInputComponent from "../common/TextInputComponent";
import React, { FormEvent, useState } from "react";
import ButtonComponent from "../common/ButtonComponent";
import api from "../../api";
import { NavLink, useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import ComponentOverlayPreloader from "../common/ComponentOverlayPreloader";

export default function RegisterForm() {
  const [data, setData] = useState({
    username: "",
    password: "",
    passwordRepeat: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetInputs = () => {
    setData({
      username: "",
      password: "",
      passwordRepeat: "",
    });
  };

  const inputsValid = () => {
    return (
      data.username.length &&
      data.password.length &&
      data.password === data.passwordRepeat
    );
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputsValid()) {
      resetInputs();
      return;
    }
    setLoading(true);
    const response = await api.user.register(data);
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
    <form className="register-form" onSubmit={onSubmit}>
      <h1>Register</h1>
      <div className="register-form__inputs-container">
        <TextInputComponent
          placeholder="Login"
          value={data.username}
          disabled={loading}
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            setData({ ...data, username: (e.target as HTMLInputElement).value })
          }
        />
        <TextInputComponent
          placeholder="Password"
          type="password"
          value={data.password}
          disabled={loading}
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            setData({ ...data, password: (e.target as HTMLInputElement).value })
          }
        />
        <TextInputComponent
          placeholder="Password repeat"
          type="password"
          value={data.passwordRepeat}
          disabled={loading}
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            setData({
              ...data,
              passwordRepeat: (e.target as HTMLInputElement).value,
            })
          }
        />
      </div>
      <ButtonComponent type="submit" text="Register" disabled={loading} />
      <NavLink
        to="/auth/login"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "5px",
        }}
      >
        Login
      </NavLink>

      {loading && <ComponentOverlayPreloader />}
    </form>
  );
}
