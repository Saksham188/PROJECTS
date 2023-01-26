const User = require("../model/userModel");
// bcrypt used for encryption of password.
const brcypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // console.log(req.body); //here we can see all data inputted by user
    const userNameCheck = await User.findOne({ username });

    if (userNameCheck) {
      return res.json({ message: "Username already used.", status: false });
    }
    // findOne used for searching in MongoDb
    const emailCheck = await User.findOne({ email });

    if (emailCheck) {
      return res.json({ message: "Email already used.", status: false });
    }
    // if everything perfect then encrypt pass. here 10 is salt value referring type of encryption
    const hashedPassword = await brcypt.hash(password, 10);
    // After hashing the password place the password in database
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    // now we will return all the info from database except user password
    delete user.password;
    return res.json({ status: true, user });
  } 
  catch (error) {
    // express has default error handler called next(), here we can pass errors from asynchronous functions
    next(error);
  }
};


module.exports.login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      // console.log(req.body); //here we can see all data inputted by user
      const user= await User.findOne({ username });
  
      if (!user) {
        return res.json({ message: "Incorrect Username or password", status: false });
    }
    // Here compare password from frontend and backend
    
    const isPasswordValid=await brcypt.compare(password,user.password);
    
    if (!isPasswordValid) {
        return res.json({ message: "Incorrect Username or password", status: false });
      }
      // if everything perfect then encrypt pass. here 10 is salt value referring type of encryption
      // now we will return all the info from database except user password
      delete user.password;
      return res.json({ status: true, user });
    } 
    catch (error) {
      // express has default error handler called next(), here we can pass errors from asynchronous functions
      next(error);
    }
  };
  

  module.exports.setAvatar = async (req, res, next) => {
  
    try {
        const userid=req.params.id;
        const avatarImage=req.body.image;
        const userData=await User.findByIdAndUpdate(userid,{
            isAvatarImageSet: true,
            avatarImage,
        });

        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        })
    
  } catch (error) {
    
  }


}


module.exports.checkUserName=async (req,res,next)=>{

  try {

    const {username}=req.body;
    const user=await User.findOne({username});
    if(user)
    {
      // if username is present
      return res.json({
        status: false,
        msg: "Username unavailable",
      })
    }
    else
    {
      return res.json({
        status: true,
        msg: "Username Available",
      })

    }
    
  } catch (error) {
    next(error)
  }
}


// now we create api to see if the user is present in database or not
module.exports.firebaseLogin=async(req,res,next)=>{
  try {

      const {email}=req.body;
      if(email)
      {
        // if there is email then see if any user present in database or not
         const user= await User.findOne({email});
         if(user)
         {
             delete(user.password); //delete user password as we dont wanna show him pass
             return res.json({status: true,user})
            }
            else
            {
              return res.json({status: false,msg: "Email not found in database, Welcome new user"})

         }
      }
    
  } catch (error) {
    next(error);
  }
}


module.exports.getAllUsers = async (req, res, next) => {

    try {
        //here we select all users except our user id 
        const users=await User.find({_id: {$ne: req.params.id}}).select([
        // we doing this as it also contain password and we dont want user to see password.
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);
        return res.json(users);
    } catch (error) {
        next(error);
    }

}


module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (error) {
    next(error);
  }
};
