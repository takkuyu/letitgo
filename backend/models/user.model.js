const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String, // some validations
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email:{
        type: String, // some validations
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    },
    password:{
        type:String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    }
},{
    timestamps: true 
});

const User = mongoose.model('User', userSchema);

module.exports = User;