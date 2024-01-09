import { cleanEnv, port, str } from "envalid";

const env = cleanEnv(process.env, {
  PORT: port({ desc: "Port for running the app" }),
  DB_URL: str({ desc: "MongoDB Url connection" }),
});

export default env;
