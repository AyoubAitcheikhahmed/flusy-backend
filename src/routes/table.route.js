import express from 'express';
import { createTable, getTablesByRestaurant } from "../controllers/tables.controller.js";

const router = express.Router();

// Add a new table
router.post('/create', createTable);

// Get tables by restaurant
router.get('/:restaurantId', getTablesByRestaurant);

export default router;
