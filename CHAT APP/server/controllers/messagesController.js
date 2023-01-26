const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: "Message added successfully." });

    return res.json({ msg: "Failed to add message to Database." });
  } catch (error) {
    next(error);
  }
};

// getAllMessages from user
module.exports.getAllMessage = async (req, res, next) => {
  try {
    const {from,to}=req.body;
    const messages=await messageModel.find({
        // here find all messages from one user to another
        users:{
            $all: [from,to],
        },
    })
    // 1 refers to sort in ascending order and -1 in descending order
    .sort({updatedAt: 1});

    const projectMessages=messages.map((msg)=>{
        return {
            fromSelf: msg.sender.toString() ===from, //if its from current user write it to true
            message: msg.message.text,
        };
    });

    res.json(projectMessages);

  } catch (error) {
    next(error);
  }
};
