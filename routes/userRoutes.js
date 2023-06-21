const express = require("express")
const { registserUser, loginUser, currentUser } = require("../controllers/userController")
const router = express.Router()
router.post("/register",registserUser)
router.post("/login",loginUser)
router.get("/current",currentUser)
module.exports = router