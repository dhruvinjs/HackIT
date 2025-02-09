import express from "express"


import cookieParser from "cookie-parser"
import cors from "cors"
import { useroutes } from "./routes/user-routes.js"
import organizationRoutes from "./routes/organization.routes.js"
import { app } from "./utils/socket.js"
import teamRoutes from "./routes/team.routes.js";

import nodemailer from "nodemailer";
import passport from "passport"

async function createTestAccount() {
    const testAccount = await nodemailer.createTestAccount();
    console.log(testAccount);
}

// createTestAccount();
app.use(passport.initialize())
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true,
  }));
app.use('/api/user',useroutes)
app.use('/api/organization',organizationRoutes)
app.use('/api/team',teamRoutes)
