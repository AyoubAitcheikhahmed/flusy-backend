import express from "express";

const router = express.Router();


const defaultRequestMapping = (req, res) => {
  res.send("Server is running");
};

// Set up the route to use the register function
router.get("/", defaultRequestMapping);

export default router;
