function getGoogleAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri: "http://localhost:5173/api/sessions/oauth/google",
    client_id:
      "926975398170-p7g488cjlgtv4jptqilr5b5fiajd0lda.apps.googleusercontent.com",
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  console.log({ options });
  const qs = new URLSearchParams(options);
  console.log({ qs: qs });

  return `${rootUrl}?${qs.toString()}`;
}

export default getGoogleAuthURL;
