const { addMessage, getAllMessage } = require("../controllers/messagesController");

const router=require("express").Router();

// here if we have post request then go to /register
router.post("/addmsg/",addMessage)
router.post("/getmsg/",getAllMessage)

module.exports =router;



