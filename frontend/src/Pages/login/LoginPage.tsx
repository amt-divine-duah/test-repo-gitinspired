import InformationArea from '../../components/login/InformationArea';
import LoginForm from '../../components/login/LoginForm';

const LoginPage = () => {
  return (
    <div className='login-display'>
      <InformationArea image={'/Frame1.png'} />
      <div className='login-form'>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
