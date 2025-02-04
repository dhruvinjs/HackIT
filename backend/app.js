import express from "express"
import dotenv, { configDotenv } from "dotenv"

dotenv.config({
    path:'./.env'
})

import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"
import { useroutes } from "./routes/user-routes.js"
const app=express()
const routes=express.Router()

import nodemailer from "nodemailer";

async function createTestAccount() {
    const testAccount = await nodemailer.createTestAccount();
    console.log(testAccount);
}

// createTestAccount();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this URL
  }));
app.use('/user',useroutes)

export {app}