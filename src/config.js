const development = process.env.NODE_ENV !== "production";

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

export const OAUTH_SERVER_URI = process.env.REACT_APP_OAUTH_SERVER_PROD;

// export const OAUTH_SERVER_URI = development
//   ? process.env.REACT_APP_OAUTH_SERVER_PROD
//   : process.env.REACT_APP_OAUTH_SERVER_PROD;
