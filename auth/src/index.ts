import express from "express";

import {
  currentUserRouter,
  loginRouter,
  logoutRouter,
  registerRouter,
} from "./routes";

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(currentUserRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(registerRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
