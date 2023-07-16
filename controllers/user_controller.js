const express = require("express");
const user_schema = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

async function register_user(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email or password missing",
        status: 400,
      });
    }
    
    // Check if email exists
    let user = await user_schema.findOne({ email });

    if (user !== null) {
      return res.status(401).json({
        message: "Email already exists.",
        status: 401,
      });
    }

    // Hash the password
    const hash_password = await bcrypt.hash(password, 10);

    // Create the user
    user = await user_schema.create({
      email,
      password: hash_password,
    });

    res.status(200).json({
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      status: 500,
      data: {},
    });
  }
}

async function login_user(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "email and password are required." });
    }

    // Fetch user from the database (replace with your own logic)
    const user = await user_schema.findOne({ email });

    // Verify user existence and validate password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign({ user_id: user._id }, process.env.secret_key, {
      expiresIn: "365d",
    });

    // Return the token to the client
    res.status(200).json({
      message: "login succssefully ",
      token,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while logging in." });
  }
}

module.exports = {
  register_user,
  login_user,
};
