    import {Server} from "socket.io"
    import http from 'http'
    import express from "express"
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
        
        const userId = socket.handshake.query.userId;
        if(userId) userSocketMap[userId] = socket.id;

        io.emit("getOnlineUsers",Object.keys(userSocketMap));
        
    

    
    //Meeting Logic
    socket.on('host-meeting',async(teamId)=>{
        const team=await TeamModel.findById(teamId)
        if (!team) {
            socket.emit("error", { message: "Invalid Team Id" });
            return;
        } 
        const roomId=generateRoomId()
        socket.join(meetingRoomId);
        console.log(`New Meeting hosted in ${roomId} with ${team.name}`);
        //This will emit the roomId to chatroom of teamMembers
        io.to(team).emit('meeting-hosted',{roomId})
    })


    socket.on('join-meeting',(roomId)=>{
        if(!roomId){
            socket.emit('error',{message:"Room id not provided"})
        }

        socket.join(roomId)

        io.to(roomId).emit('new-joinee',{message:"New Joinee just joined"})

    })


        // --- WebRTC Signaling events ---

        // Forward an offer from one peer to another.
        socket.on("offer", (data) => {
            // Expected payload: { offer, target }
            const { offer, target } = data;
            console.log(`Forwarding offer from ${socket.id} to ${target}`);
            io.to(target).emit("offer", { offer, sender: socket.id });
        });

        // Forward an answer from one peer to another.
        socket.on("answer", (data) => {
            // Expected payload: { answer, target }
            const { answer, target } = data;
            console.log(`Forwarding answer from ${socket.id} to ${target}`);
            io.to(target).emit("answer", { answer, sender: socket.id });
        });

        // Forward ICE candidates to the appropriate peer.
        socket.on("ice-candidate", (data) => {
            // Expected payload: { candidate, target }
            const { candidate, target } = data;
            console.log(`Forwarding ICE candidate from ${socket.id} to ${target}`);
            io.to(target).emit("ice-candidate", { candidate, sender: socket.id });
        });
        socket.on("disconnect",()=>{
            console.log("A user disconnected , ",socket.id)
            delete userSocketMap[userId];
            io.emit("getOnlineUsers",Object.keys(userSocketMap));

        })
    })

    export {io,app,server,userSocketMap};