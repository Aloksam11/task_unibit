const express = require("express");
const ticket_schema = require("../models/ticket");
const user_schema = require('../models/user')
const generate_tambula_tickets = require('../middlewares/generate_tickets')

async function create_ticket(req, res){
  try {
    const { num_ticket_set, user_id } = req.body;
    let tickets_data;
    if (num_ticket_set <= 0) {
      return res
        .status(400)
        .json({ error: "Number of tickets should be greater than 0" });
    }

    const user = await user_schema.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    for (let i = 0; i < num_ticket_set; i++) {
      const tickets = generate_tambula_tickets();

    for (let [ticket_id, data] of Object.entries(tickets)) {
        tickets_data = await ticket_schema.create({
          ticket_data: data,
          user: user._id,
        })
  
      }
    }
    res.status(201).json({ message: "Ticket created successfully",tickets_data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create ticket" });
  }
};

async function fetch_tickets(req, res){
  const user_id = req.params.user_id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;

  try {
    // Get total count of tickets
    const total_count = await ticket_schema.find({ user: user_id }).count();

    // Calculate pagination values
    const total_pages = Math.ceil(total_count / limit);
    const skip = (page - 1) * limit;

    // Fetch ticket lists
    const tickets = await ticket_schema.find({ user: user_id }).skip(skip).limit(limit);
    res.json({
      total_count,
      total_pages,
      current_page: page,
      tickets,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { create_ticket,fetch_tickets };
