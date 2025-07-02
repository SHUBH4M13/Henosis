const PORT = 8000

const express = require("express");
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http")

require('dotenv').config();
const {connectDB} = require("./connection");
const loginrouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const editrouter = require("./routes/edit");
const dashboardrouter = require("./routes/dashboard");
const UserRouter = require("./routes/user")
const projectrouter = require("./routes/project");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB('mongodb://127.0.0.1:27017/Henosis');
app.use("/login" , loginrouter);
app.use("/signup" , signupRouter);
app.use("/edit" , editrouter);
app.use("/dashboard" , dashboardrouter);
app.use("/project" , projectrouter ); 
app.use("/user" , UserRouter );

const server = http.createServer(app);
const io = new Server(server , {
    cors: {
        origin : "http://localhost:5173",
        methods: ['GET' ,'POST' , 'PUT' , 'PATCH' , 'DELETE']
    }
})

io.on("connection" , (socket) => {
    console.log("user connected" , socket.id );

    socket.on("Send message" , (data) => {
        io.emit("receive_message" , data )
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });

})

server.listen( PORT , () => {
    console.log(`Server started at http://localhost:${PORT}`);
})