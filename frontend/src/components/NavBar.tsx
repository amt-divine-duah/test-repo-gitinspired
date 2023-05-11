import '../Styles/navbar.scss'
import { NavLink } from 'react-router-dom'
import SignoutModal from './SignoutModal'
import { useState } from 'react'

const NavBar = () => {
  const[logout, setLogout]=useState(false)
  const handleLogout=()=>{
    setLogout(prev=>!prev)
  }
  return (
    <header className="navbar">
      <div className="left-nav">
        <img src="./logo.png" alt="" />
      
      <NavLink to={'/admin-dashboard'}>Dashboard</NavLink>  
      <NavLink to={'/student'}>Student</NavLink>
      <NavLink to={'/lecturer'}>Lecturer</NavLink>
    
      </div>

      <div className="right-nav">
        <button className='logout' onClick={handleLogout}>Logout</button>
        <p>ellaneizer@gmail.com</p>
        <img src="./user 2.png" alt="" />
      </div>
      {logout===true && <SignoutModal handleLogout={handleLogout} /> }
    </header>
  )
}

export default NavBar