const User = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');
const generateToken = require("../config/generatetoken");


const login=expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user=await User.findOne({username});
    if(user && (await user.matchPassword(password))){
       
        res.json({
            id:user._id,
            remark:"login successfull",
            username:user.username,
            token:generateToken(user._id),
        });
        return;
    }
    if(user){
        res.json({
            remark:"Invalid password",
        });
        return;
    }
    // signup
    // const new_user=new User({
    //     username,
    //     password,
    // });
    // await new_user.save();
    // res.json({
    //     id:new_user._id,
    //     remark:"signup successfull",
    //     username:new_user.username,
    //     token:generateToken(new_user._id),
    // });

    res.json({
        remark:"User does not exist",
    });

})
const signup=expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user=await User.findOne({username});
    if(user){
        res.json({
            remark:"User already exists",
        });
        return;
    }
    // signup
    const new_user=new User({
        username,
        password,
    });
    await new_user.save();
    res.json({
        id:new_user._id,
        remark:"signup successfull",
        username:new_user.username,
        token:generateToken(new_user._id),
    });

})
module.exports={login,signup}
