const {Schema , model} = require(`mongoose`)

const userschema = new Schema({
    username : {
        type : String,
        required : true
    }
    ,
    password : {
        type : String,
        required : true
    }
    ,
    email : {
        type : String,
        required : true
    }
    ,
    joining : {
        type : Date,
        default : Date.now
    }
})

const User = model(`user`,userschema)
module.exports = User