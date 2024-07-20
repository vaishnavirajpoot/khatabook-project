const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    
    fullname: {
        type: String,    // Data type of the field is String
        required: true,  // Ensures that the field is not empty
        minlength: 3,    // Minimum length of the string is 3 characters
        maxlength: 100   // Maximum length of the string is 100 characters
      },
      
    username: {
        type: String,
        trim:true,
        required: true,
        unique: true, // Ensures that usernames are unique across the collection
        minlength: 3, // Minimum length of the username
        maxlength: 50 // Maximum length of the username
    },
    email: {
        type: String,
        required: true,
        trim:true,
        unique: true, // Ensures that emails are unique across the collection
        match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'] // Validates the email format
    },
    password: {
        type: String,
        required: true,
        minlength: 2, // Minimum length of the password
        maxlength: 1024, // Maximum length of the password
        Select:false
    },
    profilePicture:{
        type:String,
        trim:true,
    },
    hisaab:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:"hisaab",
        }
    ]
});




module.exports = mongoose.model("user",userSchema);