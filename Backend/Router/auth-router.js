const express = require('express');
const router = express.Router()

const AuthController = require('../Controller/auth-controller')

router.route('/login').post(AuthController.login)
router.route('/register').post(AuthController.register)
router.route("/verifyToken").get(AuthController.verifyToken)

module.exports = router;