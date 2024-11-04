import express from "express";

const router = express.Router();
const prisma = new PrismaClient();

const defaultRequestMapping = async (req, res) => {

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
};

// Set up the route to use the register function
router.get("/", defaultRequestMapping);

export default router;
