import React, { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

const TicketList = () => {
  const [tickets, setTickets] = useState([])
  const [selectedPriority, setSelectedPriority] = useState(null)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/tickets")
        setTickets(res.data)
      } catch (err) {
        console.error("Error fetching tickets:", err)
      }
    }
    fetchTickets()
  }, [])

  const filteredTickets = selectedPriority
    ? tickets.filter((ticket) => ticket.priority === selectedPriority)
    : tickets

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-600 border border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-600 border border-yellow-200"
      case "low":
        return "bg-green-100 text-green-600 border border-green-200"
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200"
    }
  }

  return (
    <>
      <Navbar />
      <Sidebar onFilterChange={setSelectedPriority} />
      <main className="min-h-screen pt-20 pl-16 md:pl-64 transition-all duration-300 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Ticket List</h1>
            <p className="text-gray-600">
              {selectedPriority
                ? `Showing ${filteredTickets.length} ${selectedPriority} priority ticket${
                    filteredTickets.length !== 1 ? "s" : ""
                  }`
                : `Showing all ${filteredTickets.length} tickets`}
            </p>
          </div>

          <div className="space-y-4">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="p-6 rounded-lg bg-white border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{ticket.title}</h3>
                      <p className="text-gray-700 mb-2">{ticket.description}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>#{ticket._id.slice(-4)}</span>
                        <span>•</span>
                        <span>{ticket.status}</span>
                        <span>•</span>
                        <span>{new Date(ticket.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                        ticket.priority
                      )}`}
                    >
                      {ticket.priority.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 text-gray-500">
                No tickets found with the selected filters.
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default TicketList
