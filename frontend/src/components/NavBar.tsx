import '../Styles/navbar.scss'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="left-nav">
        <img src="./logo.png" alt="" />
     <Link to={'/'} className='link'>Dashboard</Link>
    <Link to={'/student'} className='link'>Student</Link>
    <Link to={'/lecturer'} className='link'>Lecturer</Link>
      </div>

      <div className="right-nav">
        <button className='logout'>Logout</button>
        <p>ellaneizer@gmail.com</p>
        <img src="./user 2.png" alt="" />
      </div>
    </nav>
  )
}

export default NavBar