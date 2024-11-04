import express from "express";
import { getAllUsers, activateUser,deactivateUser,deleteUser } from "../controllers/user.controller.js"
const router = express.Router();


router.patch("/:id/activate", activateUser);
router.patch("/:id/deactivate", deactivateUser);
router.delete("/:id", deleteUser);

// Fetch all users
router.get("/", getAllUsers);

export default router;
