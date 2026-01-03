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
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-ticket" element={<CreateTicket />} />
          <Route path="/tickets" element={<TicketList />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
