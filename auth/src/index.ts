import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { userRouter } from "./routes/user.route";
import { errorHandler } from "./middlewares/error.middleware";
import { NotFoundError } from "./errors/not-found.error";
import { DBConnectionError } from "./errors/db.error";
import { UserService } from "./services";

const PORT = 3001;
const app = express();
const router = express.Router();

app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use("/", router);

userRouter(router, new UserService());

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
