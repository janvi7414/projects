import React, { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Pages
import Home from "./pages/Home"
import CreateTicket from "./pages/CreateTicket"
import TicketList from "./pages/TicketList"
import About from "./pages/About"

// Components
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"

function App() {

  const [collapsed, setCollapsed] = useState(true);

  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
      <main className={`min-h-screen pt-20 transition-all duration-300 bg-gray-50 ${collapsed ? "pl-16" : "pl-64"}` }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-ticket" element={<CreateTicket />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/about" element={<About/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
