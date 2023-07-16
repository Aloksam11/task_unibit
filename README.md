# task_unibit
Project Name
Tambola create Ticket and fetches tickets

To register a user:-(POST)
http://localhost:5000/users/register
In the body pass json like this:-
{
    "email":"chauhan.alok1995@gmail.com",
    "password":"Qwerty1234"
}

To log in the user:-(POST)
http://localhost:5000/users/login
In the body pass json like this:-
{
    "email":"chauhan.alok1995@gmail.com",
    "password":"Qwerty1234"
}

To create the ticket:-(POST)
http://localhost:5000/users/ticket
In the body pass json like this:-
{
"num_ticket_set":2, 
"user_id":"64b4154b243ae82df74268f9"
}

To fetch the ticket:-(GET)
http://localhost:5000/users/get_tickets/64b4154b243ae82df74268f9?page=1
