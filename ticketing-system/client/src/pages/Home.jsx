import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

export default function Home() {
  const [tickets, setTickets] = useState([])
  const [selectedPriority, setSelectedPriority] = useState(null)

  // Fetching tickets from backend
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

  // Filter tickets based on priority (optional)
  const filteredTickets = selectedPriority
    ? tickets.filter((ticket) => ticket.priority === selectedPriority)
    : tickets

  // Priority badge colors
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
      {/* <Sidebar onChange={setSelectedPriority} /> */}
      <main className="min-h-screen pt-20 pl-16 md:pl-64 transition-all duration-300 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-8 ">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">Welcome to TicketMaster</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A professional ticketing app with responsive navbar, collapsible sidebar, and priority filtering.
          </p>

          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6">Recent Tickets</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredTickets.slice(0, 3).map((ticket) => (
                <div
                  key={ticket._id}
                  className="p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2">{ticket.title}</h3>
                  <p className="text-muted-foreground mb-2">{ticket.description}</p>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority.toUpperCase()}
                  </div>
                </div>
              ))}
              {filteredTickets.length === 0 && (
                <p className="text-gray-500 col-span-full">No recent tickets available.</p>
              )}
            </div>
          </div>

          {/* Demo Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-card border border-border">
              <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
              <p className="text-muted-foreground">Navbar and sidebar adapt perfectly to mobile and desktop</p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border">
              <h3 className="text-xl font-semibold mb-2">Priority Filtering</h3>
              <p className="text-muted-foreground">Filter tickets by Low, Medium, or High priority from sidebar</p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border">
              <h3 className="text-xl font-semibold mb-2">Smooth Animations</h3>
              <p className="text-muted-foreground">Hover effects and transitions for a polished experience</p>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="mt-16 space-y-6 max-w-3xl mx-auto text-left">
            <h2 className="text-3xl font-bold">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4">
                <span className="text-2xl">🔔
                </span>
                <div>
                  <h4 className="font-semibold mb-1">Notification Badge</h4>
                  <p className="text-sm text-muted-foreground">Stay updated with new ticket notifications</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4">
                <span className="text-2xl">🌓</span>
                <div>
                  <h4 className="font-semibold mb-1">Dark/Light Mode</h4>
                  <p className="text-sm text-muted-foreground">Toggle themes with smooth transitions</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4">
                <span className="text-2xl">📱</span>
                <div>
                  <h4 className="font-semibold mb-1">Mobile Optimized</h4>
                  <p className="text-sm text-muted-foreground">Hamburger menu and collapsible sidebar</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4">
                <span className="text-2xl">🎯</span>
                <div>
                  <h4 className="font-semibold mb-1">Active Link Highlighting</h4>
                  <p className="text-sm text-muted-foreground">Animated underline shows current page</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Content */}
          <div className="mt-32 space-y-8">
            <h2 className="text-3xl font-bold">Scroll to See Effects</h2>
            <p className="text-muted-foreground">The navbar adds shadow and blur effects when you scroll down</p>
            <div className="h-200 flex items-center justify-center">
              <div className="text-6xl">👇</div>
            </div>
            <p className="text-2xl font-semibold">You scrolled!</p>
          </div>
        </div>
      </main>
    </>
  )
}
