import Auth0JS from "auth0-js";

export function socialAuth(
  connection: "google-oauth2" | "linkedin" | "github" | "windowslive",
  login_hint?: string
) {
  const webAuth = new Auth0JS.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN as string,
    clientID: process.env.REACT_APP_AUTH0_CLIENT as string,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE as string,
    redirectUri: `${window.location.origin}/callback`,
  });

  webAuth.authorize({
    connection,
    login_hint,
    responseType: "token",
  });
}
