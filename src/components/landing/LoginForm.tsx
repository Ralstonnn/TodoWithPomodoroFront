import "../../style/landing/login-form.scss";
import React, { FormEvent, useState } from "react";
import TextInputComponent from "../common/TextInputComponent";
import ButtonComponent from "../common/ButtonComponent";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const resetInputs = () => {
    setUsername("");
    setPassword("");
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.length || !password.length) {
      resetInputs();
      return;
    }
    console.log("submit login");
    console.log(`username: ${username}`);
    console.log(`password: ${password}`);
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
