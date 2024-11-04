import bcrypt from "bcrypt";
import prisma from "../models/index.js"
import jwt from "jsonwebtoken";
import { RestaurantOwnerDTO } from "../models/dto/RestaurantOwnerDTO.js";


export const register = async (req, res) => {

  const {
        email, password, firstName, lastName, address, 
        phone, restaurantName, restaurantAddress
    } = req.body;

    try {
        const hashedPw = await bcrypt.hash(password, 11);
        const role = "manager";
        const defaultStatus = 'INACTIVE';
        

        await prisma.restaurantOwner.create({
            data: {
                email,
                password: hashedPw,
                firstName,
                lastName,
                restaurants: {
                    create: {
                        name: restaurantName,    
                        address: restaurantAddress,
                    }
                }
            }
        });

        res.status(201).json({ message: "Manager and Restaurant created successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not create the manager and restaurant." });
    }
};



export const login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: "Email is required!" });
  }

  try {
    // Find the restaurant owner by email
    const user = await prisma.restaurantOwner.findUnique({
      where: { email },
    });

    if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials!" });

    // Generate the token
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

        const restaurant = await prisma.restaurant.findFirst({
      where: { restaurantOwnerId: user.id }
    });




    // Create a DTO instance for the response
    const userInfo = new RestaurantOwnerDTO(user.email, user.firstName, user.lastName,restaurant);
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};


export const logout = (req,res) => {
    res.clearCookie("token").status(200).json({message: "logout success!"});
}


