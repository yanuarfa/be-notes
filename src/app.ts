import "dotenv/config";
import express, { Request, Response } from "express";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

import notesRoutes from "./routes/notes";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/notes", notesRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found!"));
});

app.use((error: unknown, req: Request, res: Response) => {
  console.log(error);
  let errorMessage = "An unknown error occured!";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
