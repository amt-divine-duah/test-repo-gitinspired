import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { useEffect, useState } from 'react';
import { useIsAuthenticated, useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import api from '../../ApiClient';
import { showErrorMessage, showSuccessMessage } from '../../constants/messages';
import { FormErrors, LoginSubmitButtonType } from './CustomTypes';
import LoginResetButton from './LoginSubmitButton';

const buttonData = {
  id: 'login',
  buttonName: 'Login',
} as LoginSubmitButtonType;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordView, setPasswordView] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [invalidRes, setInvalidRes] = useState(null);
  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/landing');
    }
  }, [isAuthenticated, navigate]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = { emailOrId: email, password: password };
      const response = await api.post('/api/auth/login', formData);
      if (response.status === StatusCodes.OK) {
        if (
          signIn({
            token: response.data?.data['accessToken'],
            expiresIn: 60,
            tokenType: 'Bearer',
            authState: {
              ...response.data?.data,
            },
          })
        ) {
          showSuccessMessage(`${response.data?.message}`);
          localStorage.setItem('accessToken', response.data?.data['accessToken']);
          api.defaults.headers['Authorization'] = 'Bearer ' + response.data?.data['accessToken'];
          navigate('/landing');
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
          if (error.response?.data['error']['password']) {
            setInvalidRes(error.response?.data['message']);
            setFormErrors({});
          }
          if (error.response?.data['error']['emailOrId']) {
            setInvalidRes(null);
            setFormErrors(error.response?.data['error']);
          }
          return;
        }
        if (error.response?.status === StatusCodes.BAD_REQUEST) {
          setFormErrors({});
          setInvalidRes(error.response?.data['message']);
          return;
        } else {
          setFormErrors({});
          setInvalidRes(null);
          showErrorMessage('Something went wrong');
          return;
        }
      } else {
        showErrorMessage('Something went wrong');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='content-wrapper'>
        <p className='form-title'>Welcome Back , Log in</p>
        <div className={invalidRes ? 'tooltip visible' : 'tooltip '} id='tooltip-main'>
          <div className='tooltip-content'>
            <p className='tooltip-main'>{invalidRes}</p>
          </div>
        </div>
        <div className='input-wrapper'>
          <div className='email'>
            <label htmlFor='email'>
              <b>Email/ID</b>
            </label>
            <input
              type='text'
              placeholder='Enter your email or ID'
              name='email'
              required
              id='email'
              className={`${formErrors['emailOrId']?.[0] ? ' error' : ''}${
                invalidRes ? ' error' : ''
              }`}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div
            className={formErrors['emailOrId']?.[0] ? 'tooltip visible' : 'tooltip '}
            id='tooltip-email'
          >
            <div className='tooltip-content'>
              <p className='tooltip-email'>Please enter correct Email or ID</p>
            </div>
          </div>
          <div className='password'>
            <label htmlFor='password'>
              <b>Password</b>
            </label>
            <input
              type={passwordView ? 'text' : 'password'}
              placeholder='Enter your Password'
              name='password'
              required
              id='password'
              className={invalidRes ? 'border error' : 'border'}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <img
              src='/eye.png'
              alt='password view toggle'
              id='eye'
              onClick={() => {
                passwordView === true ? setPasswordView(false) : setPasswordView(true);
              }}
            />
          </div>
        </div>
        <LoginResetButton data={buttonData} />
      </div>
    </form>
  );
};

export default LoginForm;
