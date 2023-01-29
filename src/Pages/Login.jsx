import GoogleSignIn from "../components/GoogleSignIn";
import LoginComponent from "../components/LoginComponent";
import "./Login.scss";

function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Spike</h1>
        <h2>Welcome to Spike!</h2>
        <LoginComponent />
        or
        <GoogleSignIn />
      </div>
    </div>
  );
}

export default Login;
