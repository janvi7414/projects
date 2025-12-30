import React from 'react'
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
        <NavLink to="/">
            Create Ticket 
        </NavLink>

        <NavLink to="/tickets">
            Ticket List  
        </NavLink>
    </nav>
  )
}

export default Navbar
