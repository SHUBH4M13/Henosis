const PORT = 8000

const express = require("express");
const app = express();
const cors = require("cors");

require('dotenv').config();
const {connectDB} = require("./connection");
const loginrouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const editrouter = require("./routes/edit");
const dashboardrouter = require("./routes/dashboard");
const UserRouter = require("./routes/user")

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB('mongodb://127.0.0.1:27017/Henosis');
app.use("/login" , loginrouter);
app.use("/signup" , signupRouter);
app.use("/edit" , editrouter);
app.use("/dashboard" , dashboardrouter);
app.use("/user" , UserRouter );

app.listen( PORT , () => {
    console.log(`Server started at http://localhost:${PORT}`);
})
