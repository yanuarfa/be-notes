import mongoose from "mongoose";

import app from "./app";
import env from "./utils/ValidateEnv";

const PORT = env.PORT || 3000;

mongoose
  .connect(env.DB_URL)
  .then(() => {
    console.log(`Connected to MongoDB`);
    app.listen(PORT, () => {
      console.log(`[server] listening to http://localhost:${PORT}`);
    });
  })
  .catch(console.error);
