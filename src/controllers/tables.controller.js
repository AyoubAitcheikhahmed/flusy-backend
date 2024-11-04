import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTable = async (req, res) => {
  try {
    const { restaurantId, seats, shape, x, y } = req.body;

    // Validate input data
    if (!restaurantId || !seats || !shape || !x || !y) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // Convert seats, x, and y to integers
    const seatsInt = parseInt(seats, 10);
    const xInt = parseInt(x, 10);
    const yInt = parseInt(y, 10);

    // Check if the conversion resulted in NaN
    if (isNaN(seatsInt) || isNaN(xInt) || isNaN(yInt)) {
      return res.status(400).json({ message: 'Seats, x, and y must be valid integers.' });
    }

    // Create a new table linked to the specified restaurant
    const newTable = await prisma.table.create({
      data: {
        seats: seatsInt,
        shape,
        x: xInt,
        y: yInt,
        restaurant: {
          connect: { id: restaurantId },
        },
      },
    });

    return res.status(201).json({ message: 'Table created successfully.', newTable });
  } catch (error) {
    console.error('Error creating table:', error);
    return res.status(500).json({ message: 'An error occurred while creating the table.' });
  }
};
// Optional: Fetch all tables for a specific restaurant
export const getTablesByRestaurant = async (req, res) => {
    console.log("GETTING TABLES REST ");
    try {
        const { restaurantId } = req.params;

        const tables = await prisma.table.findMany({
            where: { restaurantId },
        });
        console.log("GETTING TABLES REST ", tables);

        // Create an object to hold formatted tables dynamically
        const formattedTables = {};

        tables.forEach((table) => {
            const zoneKey = table.zone.toLowerCase(); // Normalize the zone to lower case

            // Check if the zoneKey already exists in formattedTables
            if (!formattedTables[zoneKey]) {
                // Initialize it as an empty array if it doesn't exist
                formattedTables[zoneKey] = [];
            }

            // Push the table information into the corresponding zone
            formattedTables[zoneKey].push({
                id: table.id,
                shape: table.shape,
                x: table.x,
                y: table.y,
            });
        });

        // Send the formatted tables as a response
        return res.json(formattedTables);
    } catch (error) {
        console.error('Error retrieving tables:', error);
        return res.status(500).json({ message: 'Failed to retrieve tables.' });
    }
};

