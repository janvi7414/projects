import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Pages
import Home from "./pages/Home"
import CreateTicket from "./pages/CreateTicket"
import TicketList from "./pages/TicketList"
import About from "./pages/About"

// Components
import Navbar from "./components/Navbar"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* Main content spacing: pt-16 for navbar, pl-16/md:pl-64 for sidebar */}
      <div className="pt-16 pl-0 md:pl-64 transition-all duration-300 min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-ticket" element={<CreateTicket />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
