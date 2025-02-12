import {Server} from "socket.io"
import http from 'http'
import express from "express"
import Organization from "../models/organization.model.js";
import { TeamModel } from "../models/team.model.js";
import { asyncHandler } from "./Asynchandler.js";

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

function generateRoomId(){  
    return Math.floor(100000 + Math.random() * 900000);
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

   
   //Meeting Logic
   socket.on('host-meeting',async(teamId)=>{
    const teamId=await TeamModel.findById(teamId)
    if (!teamId) {
        socket.emit("error", { message: "Invalid Team Id" });
        return;
      } 
      const roomId=generateRoomId()
      socket.join(meetingRoomId);
      console.log(`New Meeting hosted in ${roomId} with ${teamId.name}`);
      //This will emit the roomId to chatroom of teamMembers
      io.to(teamId).emit('meeting-hosted',{roomId})
   })


   socket.on('join-meeting',(roomId)=>{
    if(!roomId){
        socket.emit('error',{message:"Room id not provided"})
    }

    socket.join(roomId)

    io.to(roomId).emit('new-joinee',{message:"New Joinee just joined"})

   })


    socket.on("disconnect",()=>{
        console.log("A user disconnected , ",socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));

    })
})

export {io,app,server,userSocketMap};