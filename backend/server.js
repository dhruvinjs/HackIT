import { server } from "./utils/socket.js";

const port = process.env.PORT || 3000

import mongoose from "mongoose";
// initializeSocket(server)
server.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
})
const connectDb=async () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log('Connected to mongo DB'))
    .catch(err=>console.log(err))
}
connectDb()


