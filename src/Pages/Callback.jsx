// Required packages
import { useEffect } from "react";
import axios from "axios";

const Callback = () => {
  useEffect(() => {
    const handleCallback = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");

      try {
        const response = await axios.post(
          "http://localhost:4000/google-auth/callback",
          {
            code: code,
            client_id:
              "926975398170-p7g488cjlgtv4jptqilr5b5fiajd0lda.apps.googleusercontent.com",
            client_secret: "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",
            redirect_uri: "http://localhost:5173/auth/google/callback",
          }
        );

        const { access_token, expiry_date, refresh_token } = response.data;

        // Store the tokens in local storage or a state management library
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("expiry_date", expiry_date);
        localStorage.setItem("refresh_token", refresh_token);

        // Redirect to the home page or any other authorized page
        window.location.href = "http://localhost:5173/profile/";
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    handleCallback();
  }, []);

  return <p>Loading...</p>;
};

export default Callback;
