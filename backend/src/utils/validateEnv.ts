import { cleanEnv, port, str, url } from "envalid";

// cleanEnv validates and parses environment variables.
// Whatever is declared in the .env file is parsed through cleanEnv


export const validEnvVariables = cleanEnv(process.env, { // exports an object containing the validated environment vars
  MONGO_CONN_STRING: str(), // validates strings
  PORT: port(), // This provides a validator specifically for port numbers (ensuring they are within the valid range).
  SESSION_SECRET: str(),
  CLIENT_URL: url(),
});
