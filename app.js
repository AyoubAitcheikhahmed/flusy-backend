import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import cors from 'cors';
import figlet from 'figlet';
import authRoute from "./src/routes/auth.route.js";
import userRoute from "./src/routes/user.route.js"
import reservationRoute from './src/routes/reservation.route.js'
import tableRoute from './src/routes/table.route.js'

const app = express();




app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());




app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/reservation", reservationRoute);
app.use("/api/tables", tableRoute)





const PORT = process.env.PORT || 8080;

figlet('Flusy-API Server', (err, data) => {
    if (err) {
        console.error('Error generating banner:', err);
        return;
    }
    console.log(data);

    try {
        app.listen(PORT, () => {
            console.log(`🔥🔥 The server is RUNNING on port ${PORT} 🔥🔥`);
        }).on('error', (error) => {
            console.error("Error starting the server:", error);
        });
    } catch (error) {
        console.error("Synchronous error when starting the app:", error);
    }
});