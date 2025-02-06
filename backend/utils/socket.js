import {Server} from "socket.io"
import http from 'http'
import express from "express"
import Organization from "../models/organization.model.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
    }
})
const userSocketMap = {}
export function getReceiverSocketId (userId){
    return userSocketMap[userId]
}


io.on("connection",(socket)=>{
    // console.log("User connected , ",socket.id);
    
    socket.on('orgjoin',async(orgId)=>{
        await Organization.findByIdAndUpdate({_id:orgId},{
            socketId:socket.id  
        }) 
    })
    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    
   socket.on('orgDisconnect',async(orgId)=>{
    await Organization.findByIdAndUpdate({_id:orgId},{
        $unset :{socketId:""}
    }) 
   })

   
    socket.on("disconnect",()=>{
        console.log("A user disconnected , ",socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));

    })
})

export {io,app,server,userSocketMap};