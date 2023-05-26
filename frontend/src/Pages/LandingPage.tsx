import { CircularProgress } from '@mui/joy';
import React from 'react';
import { useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router';
import { ROLE } from '../constants/roles';

const LandingPage = () => {
  const navigate = useNavigate();
  const auth = useAuthUser();

  const handleNavigation = (role: string) => {
    switch (role) {
      case ROLE.ADMIN:
        navigate('/admin/dashboard');
        break;
      case ROLE.LECTURER:
        navigate('/lecturer/dashboard');
        break;
      case ROLE.STUDENT:
        navigate('/student/dashboard');
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    handleNavigation(auth()?.role);
  }, [auth()?.role]);

  return (
    <div className='landingPage'>
      <CircularProgress size='lg' />
    </div>
  );
};

export default LandingPage;
