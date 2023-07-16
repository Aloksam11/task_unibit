const { number, date, string, types } = require("joi");
const mongoose = require("mongoose");

const ticket_schema = new mongoose.Schema(
  {
    ticket_data: {
      type: [{
        type: mongoose.Schema.Types.Mixed,
        required: true,
      }],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },  
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticket_schema);

module.exports = Ticket;

