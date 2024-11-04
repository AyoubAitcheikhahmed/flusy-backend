import express from "express";
import {
  createReservation,
  getAllReservationsByRestaurantId,
} from "../controllers/reservation.controller.js";

const router = express.Router();

// Route to create a new reservation
router.post("/create", createReservation);

// Route to get all reservations
router.get("/:restaurantId", getAllReservationsByRestaurantId);

// Route to get a specific reservation by ID

export default router;
