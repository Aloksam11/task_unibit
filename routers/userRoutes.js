const express = require('express');
const jwt_verify = require('../middlewares/auth')
const user_controller = require('../controllers/user_controller');
const ticket_controller = require('../controllers/ticket_controller')

const router = express.Router();

// Register User
router.post('/register', user_controller.register_user);

// Login User
router.post('/login', user_controller.login_user);

// Create Ticket
router.post('/ticket', jwt_verify,ticket_controller.create_ticket)

//fetch ticcket
router.get('/get_tickets/:user_id',jwt_verify,ticket_controller.fetch_tickets)

module.exports = router;
