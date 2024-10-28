const express = require('express');
const router = express.Router()

const AuthController = require('../Controller/auth-controller');
const AuthMiddleWare = require('../auth-middleware');

router.route('/login').post(AuthController.login)
router.route('/register').post(AuthController.register)
router.route("/verifyToken").get(AuthController.verifyToken)
router.route('/profile').post(AuthMiddleWare, AuthController.profile)


module.exports = router;