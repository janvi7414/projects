import axios from 'axios';
import React, { useEffect, useState } from 'react'

const TicketList = () => {
const [tickets, setTickets] = useState([]);

useEffect(() => {
    axios.get("http://localhost:5000/tickets").then(res => setTickets(res.data));
},[]);

  return (
    <ul>
        {tickets.map(ticket => (
            <li>
                <h3>{ticket.title}</h3>
                <p>{ticket.description}</p>
                <span>{ticket.priority}</span>
            </li>
        ))}
    </ul>
  )
}

export default TicketList
