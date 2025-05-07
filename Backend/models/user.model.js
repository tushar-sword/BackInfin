const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define the user schema
const userSchema = new mongoose.Schema({
   fullname: {
    firstname: {
        type: String,
        required: true,
        minlength: 3,
    },
    lastname:{
        type: String,
        minlength: 3,
    }
},
    email :{
        type:String,
        required: true,
        unique: true,
        minlength: 5,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false, //when you query the user, the password will not be returned by default
    },
    phone: {
        type: String,
        minlength: 10,
    },
    address: {
        type: String, 
        minlength: 5,
    },
});

//Genrate a unique token for the user
userSchema.methods.generateAuthToken = async function () {

    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}

// Compare the password with the hashed password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// Hash the password before saving the user to the database
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}   


const userModel = mongoose.model('User', userSchema);

module.exports = userModel;