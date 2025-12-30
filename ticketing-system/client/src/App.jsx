import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTicket from "./pages/CreateTicket";
import TicketList from "./pages/TicketList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<CreateTicket />} />
        <Route path="/tickets" element={<TicketList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
