import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogOutModal from '../LogOutModal';

const Sidebar = () => {
  const [ activeDashboard, setActiveDashboard] = useState<boolean>(true);
  const [ activeStudent, setActiveStudent] = useState<boolean>(false);
  const [ activeSubmission, setActiveSubmission] = useState<boolean>(false);
  const [ activeDraft, setActiveDraft] = useState<boolean>(false);
  const [logout, setLogout] = useState(false);
  const handleLogout = () => {
    setLogout((prev) => !prev);
  };
  const navigate = useNavigate();
  const tabClick = (event: React.MouseEvent<HTMLElement>) => { 
     
     const page: string = event.currentTarget.classList[1];
     if(page === 'dashboard') {
      setActiveDashboard(true);
    } else if (page === 'students') {
      setActiveStudent(true);
    } else if (page === 'drafts') {
      setActiveDraft(true);
    } else if (page === 'submission') {
      setActiveSubmission(true);
    }
    navigate(`/lecturer/${page}`);
  };

  return (
    <div className='sidebar'>
      <div className='upper-sidebar'>
        <div className='logo'>
          <img src={'/logo.png'} alt='application logo' />
        </div>
        <div className='pages'>
          <div className={`page dashboard ${activeDashboard && 'active'}`} onClick={tabClick}>
            <p>Dashboard</p>
          </div>
          <div className={`page students ${activeStudent && 'active'}`} onClick={tabClick}>
            <p>Student</p>
          </div>
          <div className={`page submission ${activeSubmission && 'active'}`} onClick={tabClick}>
            <p>Submission</p>
          </div>
          <div className={`page drafts ${activeDraft && 'active'}`} onClick={tabClick}>
            <p>Draft</p>
          </div>
        </div>
      </div>
      <div className='bottom-sidebar'>
        <div className='user'>
          <img src={'/user 2.png'} alt='avatar' />
          <p>Prince</p>
        </div>
        <div className='nav-logout' onClick={handleLogout}>
          <p>Logout</p>
        </div>
      </div>
      {logout && <LogOutModal handleLogout={handleLogout} />}
    </div>
  );
};

export default Sidebar;
