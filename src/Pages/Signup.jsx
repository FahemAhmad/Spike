import React from "react";
import { registerUser } from "../backend/apiCalls";
import GoogleSignIn from "../components/GoogleSignIn";
import * as Toastify from "../components/Toastify";
import useLocalStorage from "../Hooks/useLocalStorage";
import "./Login.scss";

function Signup() {
  const [_, setUser] = useLocalStorage("user");
  const [token, setToken] = useLocalStorage("token");

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Spike</h1>
        <h2>Please Sign Up</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);

            // const picture = e.target.picture.files[0];
            // formData.append("picture", picture);

            await registerUser(formData).then(
              (res) => {
                Toastify.showSuccess(res?.data.message);

                setUser(res?.data.user);
                setToken(res?.data.user?.token);

                window.location = "/profile";
                
              },
              (err) => {
                Toastify.showFailure(err?.response?.data?.message);
              }
            );
          }}
        >
          <div style={{ display: "flex", gap: 30 }}>
            <label htmlFor="firstName">
              First Name
              <input
                key="firstName"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
              />
            </label>
            <label htmlFor="lastName">
              Last Name
              <input
                key="lastName"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
              />
            </label>
          </div>

          <label htmlFor="email">
            Email
            <input
              key="email"
              id="email"
              name="email"
              placeholder="Enter email"
              type={"email"}
            />
          </label>
          <label htmlFor="profilePicture">
            Profile Picture
            <input type={"file"} id="picture" name="picture" />
          </label>
          <label htmlFor="password">
            Password
            <input type={"password"} id="password" name="password" />
          </label>
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
