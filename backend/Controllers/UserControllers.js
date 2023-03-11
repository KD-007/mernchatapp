const User = require('../Models/UserSchema.js');
const catchAsyncErrors = require('../Middlewares/CatchAsyncError.js');
const ErrorHandler = require("../Utils/ErrorHandler.js");
const jwt = require("jsonwebtoken");

const rooms = ["general" , "anime" , "music" , "games"];

exports.signUp = catchAsyncErrors( async (req , res,next)=>{

    const {name , email , password , picture} = req.body;
    const user = await User.create({name, email, password , picture});
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:"7d"
    });

    res.status(201).cookie("chattoken",token, {
        httpOnly: true,
        expires :new Date(
            Date.now() +7*24*60*60*1000
        )
    }).json({user})
})

exports.login = catchAsyncErrors( async (req , res, next)=>{
    const {email, password} = req.body;
    let user = await User.findOne({email}).select("+password");
    if(!user){ return next(new ErrorHandler(404 , "invalid Credentials" ) )};
    const result = await user.comparePassword(password);
    if(!result){ return next(new ErrorHandler(404, "invalid Credentials" ))};
    user.status = "online";
    await user.save();

    user  = user.toObject();
    delete user.password;

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:"7d"
    });
    res.status(200).cookie("chattoken",token, {
        httpOnly: true,
        expires :new Date(
            Date.now() +7*24*60*60*1000
        )
    }).json({user})
});

exports.forRoom = catchAsyncErrors(async (req, res) => {
    res.status(200).json(rooms)
})

exports.authToken = catchAsyncErrors(async (req, res , next) => {
    const {chattoken} = req.cookies;
    if(!chattoken){ return};
    const result = jwt.verify(chattoken,process.env.JWT_SECRET);
    if(!result){res.clearCookie("chattoken").json({error:"login is required"}) };
    const user = await User.findById({_id:result.id});
    res.status(200).json({user});
});
