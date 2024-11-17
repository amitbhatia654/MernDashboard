require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const AuthRoute = require('./Router/auth-router');
const ChatRoute = require("./Router/chat-router")

var cors = require('cors')
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));

const connectDb = require("./utils/db")

app.use(express.json()) // this is the middleware
app.use('/api/auth', AuthRoute)
app.use("/api", AuthRoute)
app.use("/api/chat", ChatRoute)

connectDb().then(() => {
    app.listen(5000, () => console.log("server is running on port 5000"));

})
