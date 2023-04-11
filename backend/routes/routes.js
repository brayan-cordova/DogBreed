const express = require("express");
const userController = require("../src/user/userController");

const router = express.Router();


router.route('/user/create').post(userController.createUserController);


module.exports = router;