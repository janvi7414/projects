const Ticket = require("../models/Ticket");

exports.createTicket = async (req, res) => {
    // ticket is a mongoose document or a single object
    const ticket = await Ticket.create(req.body);
    // this returns ticket as a json object to the client
    res.status(201).json(ticket);
};

exports.getTicket = async (req, res) => {
    // tickets is an array of multiple objects
    const tickets = (await Ticket.find()).toSorted({ createdAt: -1 });
    res.json(tickets);
}


