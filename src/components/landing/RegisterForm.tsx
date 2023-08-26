import TextInputComponent from "../common/TextInputComponent";
import React, { FormEvent, useState } from "react";
import ButtonComponent from "../common/ButtonComponent";

export default function RegisterForm() {
  const [data, setData] = useState({
    username: "",
    password: "",
    passwordRepeat: "",
  });

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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputsValid()) {
      resetInputs();
      return;
    }
    console.log("submit login");
    console.log(`username: ${data.username}`);
    console.log(`password: ${data.password}`);
    console.log(`password repeat: ${data.passwordRepeat}`);
    resetInputs();
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
