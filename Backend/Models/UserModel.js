const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String, require: true
    }, email: {
        type: String, require: true
    },
    phone: {
        type: Number, require: true
    }
    , password: {
        type: String, require: true
    },
});

const User = new mongoose.model("User", UserSchema);
module.exports = User;