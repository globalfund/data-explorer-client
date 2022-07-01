export const msalConfig = {
  auth: {
    clientId: `${process.env.REACT_APP_MSAL_CLIENT_ID}`,
    authority: `${process.env.REACT_APP_MSAL_AUTHORITY}`, // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: `${process.env.REACT_APP_MSAL_REDIRECT_URI}`,
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
 scopes: ["User.Read"]
};
