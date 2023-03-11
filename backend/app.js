const express = require('express');
// const cors = require('cors');
const http = require('http');
const env = require('dotenv');
const cookieParser = require('cookie-parser');
const { Server } = require("socket.io");

const { getLastMessagesFromRoom, setRoomMessagesByDate } = require('./Utils/Message.js');
const User = require('./Models/UserSchema.js');
const Message = require('./Models/MessageSchema.js');
const catchAsyncError = require('./Middlewares/CatchAsyncError.js');
const path = require('path');

const app = express();

env.config()
app.use(cookieParser());

// app.use(cors({
//     origin:process.env.Frontend_URL,
//     methods:["GET", "POST","DELETE" , "PUT"],
//     credentials: true,
// }));
app.use(express.json());

app.use(express.urlencoded({extended: true}));


const server = http.createServer(app);


const io = new Server(server)


app.use("/user" , require("./Routes/UserRoutes"));

app.use(express.static(path.join(__dirname ,"../chatapp-frontend/build" )));

app.get("*" , (req, res) => {
    res.send(path.join(__dirname,"../chatapp-frontend/build/index.html"));
});

io.on("connection" , (socket)=>{
    console.log("connected to socket" , socket.id);


    io.on("disconnect" ,()=>{
        console.log("disconnected from socket")
    })
    //when user join
    socket.on("new-user", async()=>{
        const users = await User.find();
        io.emit("all-users", users)
    })

    //when user join room and msg
    socket.on("room-work", async (room , previousRoom , newMessage = null)=>{

        socket.join(room);
        socket.leave(previousRoom);

        if(newMessage){
            const {message ,currRoom , userData , time , todayDate} = newMessage;
            await Message.create({content:message, from :userData , to :currRoom , time , date:todayDate});
        }
        let roomMessages = await getLastMessagesFromRoom(room);
            roomMessages = setRoomMessagesByDate(roomMessages);
            
        if(newMessage){
            console.log(socket.id);
            io.in(room).emit("room-messages" , roomMessages , room);           
            io.except(room).emit('notifications', room);
        }else{
            socket.emit("room-messages" , roomMessages , room);
        }
    })


    //logout
    app.delete('/user/logout' , catchAsyncError(async (req , res) => {
        const {_id , newMessage} = req.body;
        res.cookie("chattoken","", {
            httpOnly: true,
            expires :new Date(
                Date.now()
            )})
        const user = await User.findById(_id);
        user.status = "offline"
        user.newMessage = newMessage;
        await user.save();
        const members = await User.find();
        io.emit("all-users" , members);
        
        res.status(200).json({});
    }))
    

})


app.use(require("./Middlewares/Errors"))
 

module.exports =server; 