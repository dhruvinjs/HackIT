import { server } from "./utils/socket.js";
import dotenv from "dotenv"

dotenv.config({
    path:'./.env'
})
const port = process.env.PORT || 4000

import mongoose from "mongoose";
// initializeSocket(server)
server.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
})
const connectDb= () => {
    mongoose.connect("mongodb+srv://testuser:testuser@cluster0.c6njz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>console.log('Connected to mongo DB'))
    .catch(err=>console.log(err))
}
connectDb()


