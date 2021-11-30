import express from "express";
import "express-async-errors";
import mongoose from "mongoose";

import {
  currentUserRouter,
  loginRouter,
  logoutRouter,
  registerRouter,
} from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import { NotFoundError } from "./errors/not-found.error";
import { DBConnectionError } from "./errors/db.error";

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(loginRouter);
app.use(logoutRouter);
app.use(registerRouter);
app.use(currentUserRouter);
app.all("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

const bootstrap = async () => {
  try {
    await mongoose.connect("mongodb://auth-db-service:27017/auth");
    console.log("Successfully connected to the DB");
  } catch (error) {
    throw new DBConnectionError();
  }

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

bootstrap();
