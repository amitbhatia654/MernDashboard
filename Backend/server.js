require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const { app, server } = require("./socket/socket");

const AuthRoute = require('./Router/auth-router');
const ChatRoute = require("./Router/chat-router")
const frontendUrl = process.env.frontendUrl

var cors = require('cors')
// app.use(cors())

app.use(cors({
    origin: frontendUrl, // Allow only this origin
    methods: ['GET', 'POST'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    exposedHeaders: ['Authorization'], // Expose specific response headers
    credentials: true, // Allow cookies
    // maxAge: 600 // Cache preflight response for 10 minutes
}));
app.use(bodyParser.json({ limit: '50mb' }));

const connectDb = require("./utils/db");

app.use(express.json()) // this is the middleware
app.use('/api/auth', AuthRoute)
app.use("/api", AuthRoute)
app.use("/api/chat", ChatRoute)

connectDb().then(() => {
    server.listen(5000, () => console.log("server is running on port 5000"));

})
