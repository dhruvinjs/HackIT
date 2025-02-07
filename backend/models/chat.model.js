import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    teamId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "teams",
        required:true
    },
    messages:[
        {
            senderId : {type:mongoose.Schema.Types.ObjectId,
                ref : "users",
                required:true
            },            
            text:{type:String,
                required:true
            },
            time:{
                type: Date, 
                default: new Date(), 
            },
        }
    ]
},{timestamps:true})
const Chat = mongoose.model("chats",chatSchema);
export default Chat;