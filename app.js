const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./connection/con");
let port = process.env.PORT;
const userRoutes = require('./routers/userRoutes');


app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);



app.listen(port, () =>{
    console.log(`server is running on ${port}`);
})