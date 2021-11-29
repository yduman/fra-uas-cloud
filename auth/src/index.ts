import express from "express";

const PORT = 3001;
const app = express();
app.use(express.json());

app.get("/api/users/current", (req, res) => {
  res.send("Hello World.");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
