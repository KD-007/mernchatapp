const ErrorHandler =require("../Utils/ErrorHandler.js");

module.exports = (err , req , res , next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";

    if(err.name==="CastError"){
        const message =`Resources not found. Invalid ${err.path}`;
        err = new ErrorHandler(404 , message);
    }
    if(err.name === "JsonWebTokenError"){
        const message =`JSON Web Token is not valid`;
        err = new ErrorHandler(  400,message);
    }
    if(err.code ===11000){
        const message = `Duplicate resource ${Object.keys(err.keyValue)}`
        err = new ErrorHandler(500 , message);

    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        })
}