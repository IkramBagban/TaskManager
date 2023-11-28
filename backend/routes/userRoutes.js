const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router();


router.get("/", userController.getUsers)


router.post("/create", userController.createUser)

router.get("/user/:id", userController.getUser)



module.exports = router;