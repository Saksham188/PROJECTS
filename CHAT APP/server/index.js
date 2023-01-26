const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const userRoutes=require("./routes/userRoutes")
const messageRoute=require("./routes/messagesRoute")
const app=express();
const socket=require("socket.io");

// dotenv is a npm package that automatically loads environment variables from .env file to process .env object
require("dotenv").config()


app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes)
app.use("/api/messages",messageRoute)


mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
// if connection successful then log connection suxxessful
.then(()=>{
    console.log("DB Connection Successful");
})
.catch((err)=>{
    console.log(err.message);
})




const server= app.listen(process.env.PORT,()=>{
    console.log(`Server started on Port ${process.env.PORT} `);
})


const io=socket(server,{
    cors:{
        origin: "http://localhost:3000",
        credentials: true,
    },
});

// here we will store all online users in this map.
global.onlineUsers= new Map();

io.on("connection",(socket)=>{
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });

    // here first we create connextion and if user is online then emit message to user ie send to user if he is not online its saved in backend, 
    socket.on("send-msg",(data)=>{
        const sendUserSocket=onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.message);
        }
    })

})



