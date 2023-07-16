const {number, date, string, types} = require("joi");
const mongoose = require("mongoose");
const user_Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                // Use your desired condition to validate the email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: 'Invalid email address'
        }
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

const user = mongoose.model("user", user_Schema)
module.exports = user;
