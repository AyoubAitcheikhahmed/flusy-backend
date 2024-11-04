import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createReservation = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      numPeople,
      description,
      reservationDateTime,
      restaurantId,
    } = req.body;

    // Validate input data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !numPeople ||
      !reservationDateTime ||
      !restaurantId
    ) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const reservation = await prisma.reservation.create({
      data: {
        firstName,
        lastName,
        email,
        numPeople,
        description,
        reservationDateTime: new Date(reservationDateTime),
        restaurantId,
      },
    });

    return res
      .status(201)
      .json({ message: "Reservation created successfully.", reservation });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while creating the reservation." });
  }
};

// Get a Single Reservation by ID
export const getAllReservationsByRestaurantId = async (req, res) => {
  try {
    const reservationId = req.params.id;

    const reservation = await prisma.reservation.findMany({
      where: { id: reservationId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        numPeople: true,
        description: true,
        reservationDateTime: true,
        createdAt: true,
        restaurant: {
          select: {
            name: true,
            address: true,
          },
        },
      },
    });

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    return res.status(200).json(reservation);
  } catch (error) {
    console.error("Error retrieving reservation:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while retrieving the reservation." });
  }
};

//get reservation by restaurantID
export const getReservationsByRestaurantId = async (req, res) => {
  try {
    const resturantId = req.params.id;

    const reservation = await prisma.reservation.findUnique({
      where: { resturantId },
    });

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    return res.status(200).json(reservation);
  } catch (error) {
    console.error("Error retrieving reservation:", error);
    return res.status(500).json({
      message: "An error occurred while retrieving the reservation.",
    });
  }
};

// Update a Reservation
export const updateReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const {
      firstName,
      lastName,
      email,
      numPeople,
      description,
      reservationDateTime,
      restaurantId,
    } = req.body;

    const updatedReservation = await prisma.reservation.update({
      where: { id: reservationId },
      data: {
        firstName,
        lastName,
        email,
        numPeople,
        description,
        reservationDateTime: new Date(reservationDateTime),
        restaurantId,
      },
    });

    return res.status(200).json({
      message: "Reservation updated successfully.",
      updatedReservation,
    });
  } catch (error) {
    console.error("Error updating reservation:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "Reservation not found." });
    }

    return res
      .status(500)
      .json({ message: "An error occurred while updating the reservation." });
  }
};

// Delete a Reservation
export const deleteReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;

    const reservation = await prisma.reservation.delete({
      where: { id: reservationId },
    });

    return res
      .status(200)
      .json({ message: "Reservation deleted successfully.", reservation });
  } catch (error) {
    console.error("Error deleting reservation:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "Reservation not found." });
    }

    return res
      .status(500)
      .json({ message: "An error occurred while deleting the reservation." });
  }
};
