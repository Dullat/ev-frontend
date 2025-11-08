import React from "react";
import { Form } from "react-router-dom";
import { useLoginMutation } from "./userApi";

const Login = () => {
  const [login] = useLoginMutation();

  const handleSubmit = (e) => {
    const formData = new FormData(e.target);
    login({
      email: formData.get("email"),
      password: formData.get("password"),
    }).unwrap();
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <input type="text" name="email" />
        <input type="password" name="password" />
        <button type="submit"></button>
      </Form>
    </div>
  );
};

export default Login;
