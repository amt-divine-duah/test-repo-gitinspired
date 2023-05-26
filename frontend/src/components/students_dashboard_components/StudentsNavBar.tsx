import { useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { NavLink } from 'react-router-dom';
import LogOutModal from '../LogOutModal';

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

        <NavLink to={'/student/dashboard'}>Dashboard</NavLink>
        <NavLink to={'/student/Submisssion'}>Submission</NavLink>
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
