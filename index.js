const PORT = 8000
const express = require("express");
const app = express();

app.get( '/' , (req,res) => {
    res.send("this is home page")
})

app.route('/login')
.get((req,res) => {
    res.send("this is login page")
})




app.get( '/signup' , (req,res) => {
    res.send("this is signup page")
})


app.listen( PORT , () => {
    console.log(`Server started at http://localhost:${PORT}`);
})
