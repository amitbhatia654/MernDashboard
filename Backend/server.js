require("dotenv").config();
const express = require("express");
const app = express();

var cors = require('cors')
app.use(cors())


const connectDb = require("./utils/db")

const AuthRoute = require('./Router/auth-router');

app.use(express.json()) // this is the middleware
app.use('/api/auth', AuthRoute)
app.use("/api", AuthRoute)

connectDb().then(() => {
    app.listen(5000, () => console.log("server is running on port 5000"));

})
