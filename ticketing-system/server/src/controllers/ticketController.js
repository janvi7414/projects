const Ticket = require("../models/Ticket");

// GET /tickets
exports.getTickets = async (req, res) => {
  const tickets = await Ticket.find().sort({ createdAt: -1 });
  res.status(200).json(tickets);
};

// GET /tickets/:id
exports.getTicketById = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  res.status(200).json(ticket);
};

// POST /tickets
exports.createTicket = async (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message: "Title and description are required",
    });
  }

  const ticket = await Ticket.create({
    title,
    description,
    priority,
  });

  res.status(201).json(ticket);
};

// PUT /tickets/:id
exports.updateTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  Object.assign(ticket, req.body);
  await ticket.save();

  res.status(200).json(ticket);
};

// DELETE /tickets/:id
exports.deleteTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  await ticket.deleteOne();
  res.status(200).json({ message: "Ticket deleted" });
};
