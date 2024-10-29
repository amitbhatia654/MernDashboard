const express = require('express');
const router = express.Router()

const AuthController = require('../Controller/auth-controller');
const AuthMiddleWare = require('../auth-middleware');

router.route('/login').post(AuthController.login)
router.route('/register').post(AuthController.register)
router.route('/profile').get(AuthMiddleWare, AuthController.profile)
router.route('/employee').post(AuthMiddleWare, AuthController.AddEmployee)
router.route('/employee').get(AuthMiddleWare, AuthController.getAllEmployee)
router.route('/employee/:id').get(AuthMiddleWare, AuthController.getEmployeeById)
router.route('/employee/:id').put(AuthMiddleWare, AuthController.updateEmployee)
router.route('/employee/:id').delete(AuthMiddleWare, AuthController.deleteEmployee)







module.exports = router;