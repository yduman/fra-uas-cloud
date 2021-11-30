import express from "express";

const router = express.Router();

router.get("/api/users/current", (req, res) => {
  res.send("Hello current user");
});

export { router as currentUserRouter };
