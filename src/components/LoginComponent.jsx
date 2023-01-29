import React, { useState } from "react";
import { loginInEndpoint } from "../backend/apiCalls";
import * as Toastify from "../components/Toastify";
import useLocalStorage from "../Hooks/useLocalStorage";

function LoginComponent() {
  // eslint-disable-next-line no-unused-vars
  const [_, setUser] = useLocalStorage("user");
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useLocalStorage("token");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await loginInEndpoint(formData).then(
      (res) => {
        Toastify.showSuccess(res?.data.message);
        setUser(res?.data.user);

        setToken(res?.data.user?.token);

        window.location = "/profile";
        console.log("res", res.data);
      },
      (err) => {
        Toastify.showFailure(err?.response?.data?.message);
      }
    );
    // submit formData to server
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder={"Your Email"}
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder={"Password"}
      />
      <button type="submit" style={{ cursor: "pointer" }}>
        Continue
      </button>
    </form>
  );
}

export default LoginComponent;
