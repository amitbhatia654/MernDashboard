const express = require('express')
const router = express.Router()
const AuthMiddleWare = require("../auth-middleware")
const ChatController = require('../Controller/chat-controller')

router.route('/newchat').post(AuthMiddleWare, ChatController.newUser)
router.route("/allChats").get(AuthMiddleWare,ChatController.getAllChats)

module.exports = router