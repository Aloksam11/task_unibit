// created the function to verify the token as a middleware

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config()

async function verifytoken(req, res, next) {
    const token = await req.headers['authorization'] // Retrieving the token from the request headers
    if (! token) 
        return res.status(401).json('Unauthorize user')
    
    try {
        const decoded = jwt.verify(token, process.env.secret_key);
        let id = decoded;
        req.user=id; // Storing the user ID in the request object for future use
        next()
        
    } catch (e) {
        res.status(400).json('Token not valid.Due to expiry of the Token')
    }
}
module.exports = verifytoken;

