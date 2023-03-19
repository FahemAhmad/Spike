import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import "./page.scss";
import GoogleIcon from "../assets/google_icon.svg";
import LoginPageImage from "../assets/login-image-icon.png";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        client_id:
          "926975398170-p7g488cjlgtv4jptqilr5b5fiajd0lda.apps.googleusercontent.com",
        redirect_uri: "http://localhost:5173/auth/google/callback",
      }).toString();

      window.location.href = `https://spike-messenger-backend.onrender.com/google-auth?${params}`;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="container-section">
        <div className="logo">
          <h2 to="/">Spikey</h2>
        </div>
        <div className="midfield-container">
          <h1>Welcome to Spikey ! 👋</h1>

          <h3>
            Spike makes email simple and fun <br /> Sign in to upgrade your
            email experience
          </h3>
          <Button
            variant="outlined"
            disabled={loading}
            onClick={handleGoogleSignIn}
            startIcon={loading && <CircularProgress size={20} />}
          >
            <img src={GoogleIcon} alt="google-icon" />
            {loading ? "Signing in..." : "Sign in with Google"}
          </Button>
        </div>
        <p>
          By continuing, you agree to Spikey’s Terms and Conditions and Privacy
          Policy.
        </p>
      </div>
      <div className="container-section section2">
        <img src={LoginPageImage} alt={"Login page"} />
        <div>
          <h1>Join our team of 20 million+ users ❤️</h1>
          <h3>
            Spike turn yours existing email into chat. See important email
            first. Take back control of your inbox
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
