import InformationArea from '../../components/login/InformationArea';
import PasswordResetForm from '../../components/login/PasswordResetForm';
const ResetPassword = () => {
  return (
    <div className='login-display'>
      <InformationArea image='/Frame.png' />
      <div className='login-form'>
        <PasswordResetForm />
      </div>
    </div>
  );
};

export default ResetPassword;
