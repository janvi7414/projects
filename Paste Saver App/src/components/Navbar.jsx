import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className=' flex flex-row font-medium bg-gray-200 gap-8 w-full justify-center mb-4 p-1.5 rounded-md'>
      <NavLink to="/">
        Home
      </NavLink>
      <NavLink to="/pastes">
        All Pastes
      </NavLink>
    </div>
  )
}

export default Navbar
