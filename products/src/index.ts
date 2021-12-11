import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { productsRouter } from "./routes/products.route";
import { errorHandler } from "./middlewares/error.middleware";
import { NotFoundError } from "./errors/not-found.error";
import { DBConnectionError } from "./errors/db.error";
import { getCurrentUser } from "./middlewares/user-context.middleware";
import { ProductService } from "./services/ProductService";

const PORT = 3002;
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
app.use(getCurrentUser);
app.use("/", router);
productsRouter(router, new ProductService());

app.all("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

const bootstrap = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY is not defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to the DB");
  } catch (error) {
    throw new DBConnectionError();
  }

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

bootstrap();
