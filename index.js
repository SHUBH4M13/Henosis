const PORT = 8000
const express = require("express");
const app = express();

app.listen( PORT , () => {
    console.log(`Server started at http://localhost:${PORT}`);
})
