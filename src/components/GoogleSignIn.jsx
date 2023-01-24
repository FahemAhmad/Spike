import useFetch from "../Hooks/useFetch";
import { signInEndpoint } from "../backend/apiCalls";
import { useEffect } from "react";
import Loader from "./Loader";

const client_id =
  "926975398170-p7g488cjlgtv4jptqilr5b5fiajd0lda.apps.googleusercontent.com";

const GoogleSignIn = () => {
  const { handleGoogle, loading, error } = useFetch(signInEndpoint);

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: client_id,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("loginDiv"), {
        text: "signin_with",
        shape: "pill",
      });

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  return (
    <>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div id="loginDiv" style={{ width: "100%" }}></div>
        )}
      </main>
    </>
  );
};

export default GoogleSignIn;
