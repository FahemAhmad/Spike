import GoogleSignIn from "../components/GoogleSignIn";
import "./Login.scss";

function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Spike</h1>
        <h2>Welcome to Spike!</h2>
        <input type={"text"} placeholder="Your email" />
        <button>Continue</button>
        or
        <GoogleSignIn />
      </div>
    </div>
  );
}

export default Login;
