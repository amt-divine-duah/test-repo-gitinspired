import { LogoutPropType } from '../customTypesAndInterface/AdminCustomTypes';
import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

const LogOutModal = ({ handleLogout }: LogoutPropType) => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate('/auth/login');
  }

  return (
    <div className='container' onClick={handleLogout}>
      <div className='signOutModal' onClick={(e) => e.stopPropagation()}>
        <h3>Confirm Logout</h3>
        <p>
          Are you sure you want to logout from{' '}
          <span className='logoutBoldText'>Assign IT Dashboard?</span>
        </p>
        <div className='logout-btns'>
          <button onClick={handleLogout}>Cancel</button>
          <button onClick={handleSignOut}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
