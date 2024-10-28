const User = require("../Models/UserModel")
const bcrypt = require('bcrypt');
const secretKey = "Amit Bhatia"
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(203).send('Email or Password is Incorrect!')
        }

        token = jwt.sign({ email: user.email }, secretKey, { expiresIn: "1hr" })
        return res.status(200).json({ message: "User Log In succesfully", token })
    }

    catch (error) {
        console.log('some error in login');

    }
}




const register = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            return res.status(203).json("User already exist")
        }

        const saltRounds = 10;
        const hash_password = await bcrypt.hash(password, saltRounds)
        await User.create({ name, email, phone, password: hash_password })
        res.status(200).json("Registered succesfully")

    } catch (error) {
        console.log(err, 'err')
        res.status(500).send("Internal Server Error")
    }
}


const profile = async (req, res) => {
    try {
        console.log("Profile func is called")
        return res.status(200).send("User is valid")
    }

    catch (error) {
        console.log('some error in profile');

    }
}


const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token provided" });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid or expired token" });

        return res.status(200).send("Token Verified")

        //req.user = user; // Token is valid, store user info in req.user
        // next();
    });
};


module.exports = { login, register, verifyToken, profile }