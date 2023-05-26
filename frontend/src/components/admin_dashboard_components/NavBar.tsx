import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogOutModal from '../LogOutModal';
import { useAuthUser } from 'react-auth-kit';

const NavBar = () => {
  const [logout, setLogout] = useState(false);
  const handleLogout = () => {
    setLogout((prev) => !prev);
  };
  const auth = useAuthUser();
  return (
    <header className='navbar'>
      <div className='left-nav'>
        <img
          src='https://github.com/amt-divine-duah/assets-folder/blob/main/logo%20.png?raw=true'
          alt=''
        />

        <NavLink to={'/admin/dashboard'}>Dashboard</NavLink>
        <NavLink to={'/admin/student'}>Student</NavLink>
        <NavLink to={'/admin/lecturer'}>Lecturer</NavLink>
      </div>

      <div className='right-nav'>
        <button className='logout' onClick={handleLogout}>
          Logout
        </button>
        <p>{auth()?.email}</p>
        <img src='/user.svg' alt='' />
      </div>
      {logout === true && <LogOutModal handleLogout={handleLogout} />}
    </header>
  );
};

export default NavBar;
