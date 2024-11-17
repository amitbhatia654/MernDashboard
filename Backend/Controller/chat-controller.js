const conversation = require("../Models/convertsationModel");
const Message = require("../Models/MessagesModel");

const newUser = async (req, res) => {
    const senderId = req.userDetail._id;
    const recieverId = req.body.recieverId;

    let chats = await conversation.findOne({
        participants: { $all: [senderId, recieverId] }
    }).populate({
        path: "participants",
        select: "-password -profilePic"
    });


    if (!chats) {
        const result = await conversation.create({
            participants: [senderId, recieverId]
        })
    }
    res.status(200).send("Called")
}




const getAllChats = async (req, res) => {
    let chats = await conversation.find({
    }).populate({
        path: "participants",
        select: "-password -profilePic"
    });

    res.status(200).send({ message: "result found", chats })
}

module.exports = { newUser, getAllChats }