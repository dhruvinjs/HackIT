import express from "express"


import cookieParser from "cookie-parser"
import cors from "cors"
import { useroutes } from "./routes/user-routes.js"
import organizationRoutes from "./routes/organization.routes.js"
import { app } from "./utils/socket.js"
import teamRoutes from "./routes/team.routes.js";
import bodyParser from "body-parser"

import nodemailer from "nodemailer";
import passport from "passport"

async function createTestAccount() {
    const testAccount = await nodemailer.createTestAccount();
    console.log(testAccount);
}

// createTestAccount();
app.use(bodyParser.json({ limit: '50mb' }));  // Increase the limit as needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(passport.initialize())
app.use(express.json({limit : '50mb'}))
app.use(cookieParser())
app.use((req, res, next) => {
  console.log(`Request Size: ${req.headers['content-length']} bytes`);
  next();
});
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true,
  }));

app.use('/api/user',useroutes)
app.use('/api/organization',organizationRoutes)
app.use('/api/team',teamRoutes)
app.get('/',async(req,res)=>{
  res.send('Hitting default route')
})
