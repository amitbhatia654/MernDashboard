const { Server } = require('socket.io')
const http = require("http")
const express = require("express");

const app = express();

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ['GET', 'POST']
    }
})


io.on("connection", (socket) => {
    console.log('user connected socket', socket.id)
    socket.emit("connecting", socket.id)
    socket.on("message", ({ roomId, message }) => {
        // console.log()
        socket.to(roomId).emit("recieve-msg", message)
    })


    



    // //socket.on is used to listen the events used on both client and server 
    socket.on("disconnect", () => {
        console.log('disconneted ', socket.id)
    })


})


module.exports = { app, io, server }
