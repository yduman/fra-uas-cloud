import express from "express";

const router = express.Router();

router.post("/api/users/logout", (req, res) => {
  res.send("Hello logout");
});

export { router as logoutRouter };
