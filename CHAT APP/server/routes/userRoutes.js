const { register,login, setAvatar, getAllUsers, firebaseLogin, logOut, checkUserName } = require("../controllers/usersController");

const router=require("express").Router();

// here if we have post request then go to /register
router.post("/register",register)
router.post("/login",login)
router.post("/setAvatar/:id",setAvatar)

router.post("/checkUserName",checkUserName)

// its get request as we r not sending any data we just want data.
router.get("/allusers/:id",getAllUsers)
router.get("/logout/:id",logOut) //Added latest
router.post("/firebaseLogin",firebaseLogin)


module.exports =router;



