import { PrismaClient } from '@prisma/client';
import { RestaurantOwnerDTO } from '../models/dto/RestaurantOwnerDTO.js';

const prisma = new PrismaClient();

// Activate Restaurant Owner
export const activateUser = async (req, res) => {
  try {
    const ownerId = req.params.userId;

    const owner = await prisma.restaurantOwner.update({
      where: { id: ownerId },
      data: { status: 'Active' },
    });

    if (!owner) {
      return res.status(404).json({ message: 'Restaurant Owner not found.' });
    }

    return res.status(200).json({ message: 'Restaurant Owner activated successfully.', owner });
  } catch (error) {
    console.error('Error activating Restaurant Owner:', error);
    return res.status(500).json({ error: 'An error occurred while activating the restaurant owner.' });
  }
};

// Deactivate Restaurant Owner
export const deactivateUser = async (req, res) => {
  try {
    const ownerId = req.params.userId;

    const owner = await prisma.restaurantOwner.update({
      where: { id: ownerId },
      data: { status: 'Inactive' },  // Assuming 'status' is part of restaurantOwner
    });

    if (!owner) {
      return res.status(404).json({ message: 'Restaurant Owner not found.' });
    }

    return res.status(200).json({ message: 'Restaurant Owner deactivated successfully.', owner });
  } catch (error) {
    console.error('Error deactivating Restaurant Owner:', error);
    return res.status(500).json({ error: 'An error occurred while deactivating the restaurant owner.' });
  }
};

// Delete Restaurant Owner
export const deleteUser = async (req, res) => {
  try {
    const ownerId = req.params.userId;

    const owner = await prisma.restaurantOwner.delete({
      where: { id: ownerId },
    });

    return res.status(200).json({ message: 'Restaurant Owner deleted successfully.', owner });
  } catch (error) {
    console.error('Error deleting Restaurant Owner:', error);

    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Restaurant Owner not found.' });
    }

    return res.status(500).json({ error: 'An error occurred while deleting the restaurant owner.' });
  }
};

// Get All Restaurant Owners
export const getAllUsers = async (req, res) => {
  try {
    const owners = await prisma.restaurantOwner.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
        email: true,
        address: true,
        restaurants: {
          select: {
            name: true,
            address: true,
          }
        }
      }
    });

    const ownerDTOs = owners.map(owner => new RestaurantOwnerDTO(
      owner.email || 'UNKNOWN',
      owner.firstName || 'UNKNOWN',
      owner.lastName || 'UNKNOWN'
    ));

    res.status(200).json(owner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve restaurant owners." });
  }
};
