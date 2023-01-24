import React from "react";
import GoogleSignIn from "../components/GoogleSignIn";
import "./Login.scss";

function Signup() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Spike</h1>
        <h2>Please Sign Up</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            console.log("form data", formData);
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
          <label>
            Profile Picture
            <input type={"file"} />
          </label>
          <button type="submit">Continue</button>
        </form>
        or
        <GoogleSignIn />
      </div>
    </div>
  );
}

export default Signup;
