import TextInputComponent from "../common/TextInputComponent";
import React, { FormEvent, useState } from "react";
import ButtonComponent from "../common/ButtonComponent";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";

export default function RegisterForm() {
  const [data, setData] = useState({
    username: "",
    password: "",
    passwordRepeat: "",
  });
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
    const response = await api.user.register(data);
    if (response.success) {
      resetInputs();
      userService.user.profile = response.data.profile;
      userService.user.token = response.data.token;
      userService.saveUserData();
      navigate("/", { replace: true });
    } else if (response.error) {
      alert(response.message);
    }
  };

  return (
    <form className="register-form" onSubmit={onSubmit}>
      <h1>Register</h1>
      <div className="register-form__inputs-container">
        <TextInputComponent
          placeholder="Login"
          value={data.username}
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            setData({ ...data, username: (e.target as HTMLInputElement).value })
          }
        />
        <TextInputComponent
          placeholder="Password"
          type="password"
          value={data.password}
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            setData({ ...data, password: (e.target as HTMLInputElement).value })
          }
        />
        <TextInputComponent
          placeholder="Password repeat"
          type="password"
          value={data.passwordRepeat}
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            setData({
              ...data,
              passwordRepeat: (e.target as HTMLInputElement).value,
            })
          }
        />
      </div>
      <ButtonComponent type="submit" text="Register" />
    </form>
  );
}
