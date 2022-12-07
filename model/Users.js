const {Schema,model} = require('mongoose'); 

const userSchema = new Schema({
    username:{
        type:String, 
        required:true, 
        unique:true
    }, 
    email:{
        type:String, 
        required:true
    }, 
    role:{
        type:String, 
        required:true, 
        enum:["Admin", "Empolyee","Head","Investor"]
    }, 
    password:{
        type:String, 
        required:true
    }
}); 

const User = model('User', userSchema); 

module.exports = User;