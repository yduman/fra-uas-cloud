import express from "express";

import { currentUserRouter } from "./routes/currentUser";

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(currentUserRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
