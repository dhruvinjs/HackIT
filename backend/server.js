import { server } from "./utils/socket.js";
import dotenv from "dotenv"
// import { app } from "./utils/socket.js";
import e from "express";

import cookieParser from "cookie-parser"
import cors from "cors"
import { useroutes } from "./routes/user-routes.js"
import organizationRoutes from "./routes/organization.routes.js"
import { app } from "./utils/socket.js"
import teamRoutes from "./routes/team.routes.js";




dotenv.config({
    path: './.env'
})
const port = process.env.PORT || 4000
import nodemailer from "nodemailer";
// import passport from "passport"
import mongoose from "mongoose";
// initializeSocket(server)
server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})
<<<<<<< Updated upstream
<<<<<<< Updated upstream
const connectDb= () => {
    mongoose.connect(mongoUrl)
    .then(()=>console.log('Connected to mongo DB'))
    .catch(err=>console.log(err))
=======
=======
>>>>>>> Stashed changes
const connectDb = () => {
    mongoose.connect("mongodb+srv://jitubhai8928:IOtDzijT2f1E26Lo@cluster0.vmkxp.mongodb.net/HackIT")
        .then(() => console.log('Connected to mongo DB'))
        .catch(err => console.log(err))
}

const mongoUrl=process.env.MONGO_URL


connectDb()

// app.use(passport.initialize())
app.use(e.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use('/api/user', useroutes)
app.use('/api/organization', organizationRoutes)
app.use('/api/team', teamRoutes)
