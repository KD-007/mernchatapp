const mongoose = require('mongoose');
const {isEmail} = require("validator");
const bcrypt  = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: [true, "name cannot be empty"],
    },
    email:{
        type: 'string',
        required: [true, "email cannot be empty"],
        unique: true,
        validate:[isEmail, "enter a valid email"],
        index:true,
    },
    password:{
        type: 'string',
        required: [true, "password cannot be empty"],
        select:false

    },
    picture:{
        type: 'string',
        required: [true, "picture cannot be empty"],
    },
    newMessage:{
        type: Object,
        default:{}
    },
    status:{
        type: 'string',
        default:'online',
    },
},{minimize: false}) 

UserSchema.pre("save" , async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 10);
    }
    next();
})

UserSchema.methods.comparePassword = async function(password){
    const result = await bcrypt.compare(password, this.password);
    return result;
}
const User = mongoose.model('User',UserSchema);

module.exports =User;