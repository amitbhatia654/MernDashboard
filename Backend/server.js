require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

var cors = require('cors')
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));

const connectDb = require("./utils/db")

const AuthRoute = require('./Router/auth-router');

app.use(express.json()) // this is the middleware
app.use('/api/auth', AuthRoute)
app.use("/api", AuthRoute)

connectDb().then(() => {
    app.listen(5000, () => console.log("server is running on port 5000"));

})
