import express from "express";

const router = express.Router();

router.post("/api/users/register", (req, res) => {
  res.send("Hello register");
});

export { router as registerRouter };
