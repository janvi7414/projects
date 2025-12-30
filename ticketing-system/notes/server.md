- server/models/Ticket.js 
    {timestamps: true} this adds fields createdAt and updatedAt 

- server/controllers/ticketController.js
    why exports.createTicket  this allows other files to use these functions in this file

    "201" for successful creation

- Any IP address can make a request to your server But only your server can make a request to the database Your server does NOT blindly accept everything.
It checks:
    Login (username/password)
    JWT token
    Role (user, admin)
    Rate limits
    Validation