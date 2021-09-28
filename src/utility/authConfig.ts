import { Configuration } from "@azure/msal-browser";
import { LogLevel } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: "66378eec-1829-4a83-884f-acdf64c51610",
    authority:
      "https://login.microsoftonline.com/46450200-7477-4c00-bfd0-9c88835db8e4",
    redirectUri: "/",
    // process.env.NODE_ENV === "production"
    //   ? "https://elogic-license-utility.azurewebsites.net/"
    //   : "/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
