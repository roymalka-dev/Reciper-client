const NODE_ENV = import.meta.env.VITE_NODE_ENV || "DEV";

const DEV_API = import.meta.env.VITE_APP_API_URL;
const PROD_API = import.meta.env.VITE_APP_API_URL_PROD;

const API = NODE_ENV === "DEV" ? DEV_API : PROD_API;

export const appConfig = {
  apiBaseUrl: API,
  apiPrefix: "/api",
  unAuthenticatedEntryPath: "/auth/sign-in",
};
