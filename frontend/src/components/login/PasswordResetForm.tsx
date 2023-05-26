import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../ApiClient';
import { showErrorMessage, showSuccessMessage } from '../../constants/messages';
import { FormErrors, LoginSubmitButtonType } from './CustomTypes';
import LoginResetButton from './LoginSubmitButton';

const PasswordResetForm = () => {
  const buttonData = {
    id: 'reset',
    buttonName: 'Reset Password',
  } as LoginSubmitButtonType;

  const [password, setPassword] = useState<string>('');
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [passwordView, setPasswordView] = useState({
    new: false,
    confirm: false,
  });

  const [modalDropDown, setModalDropDown] = useState<boolean>(false);
  const number = new RegExp('(?=.*[0-9])');
  const length = new RegExp('(?=.{8,})');
  const lower = new RegExp('(?=.*[a-z])');
  const upper = new RegExp('(?=.*[A-Z])');
  const special = new RegExp("(?=.*[$&+,:;=?@#|'<>.^*()%!-])");

  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/api/auth/confirm-account/${token}`);
        if (response.status === StatusCodes.OK) {
          showSuccessMessage('Please reset your password');
        } else {
          showErrorMessage('Something went wrong');
          navigate('/login');
        }
        return;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showErrorMessage(error.response?.data['message']);
        } else {
          showErrorMessage('Something went wrong');
        }
        navigate('/login');
      }
    })();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const password = passwordRef.current ? passwordRef.current.value : '';
      const confirmPassword = confirmPasswordRef.current ? confirmPasswordRef.current.value : '';
      const formData = { password, confirmPassword, token };
      const response = await api.post('api/auth/reset-password', formData);
      if (response.status === StatusCodes.OK) {
        showSuccessMessage(response.data?.message);
        navigate('/auth/login');
      } else {
        showErrorMessage(`Something went wrong`);
        navigate('/auth/login');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
          setFormErrors(error.response?.data['error']);
        } else if (error.response?.status === StatusCodes.BAD_REQUEST) {
          setFormErrors({});
          showErrorMessage(`${error.response?.data['message']}`);
        } else {
          setFormErrors({});
          showErrorMessage(`Something went wrong`);
        }
        return;
      }
    }
  }

  if (formErrors['password']?.[0]) {
    showErrorMessage(formErrors['password']?.[0]);
  } else if (formErrors['confirmPassword']?.[0]) {
    showErrorMessage(formErrors['confirmPassword']?.[0]);
  }

  const passwordViewToggle = (name: string) => {
    if (name === 'confirm') {
      if (passwordView.confirm === true) {
        setPasswordView({
          new: false,
          confirm: false,
        });
      } else {
        setPasswordView({
          new: false,
          confirm: true,
        });
      }
    }

    if (name === 'new') {
      if (passwordView.new === true) {
        setPasswordView({
          new: false,
          confirm: false,
        });
      } else {
        setPasswordView({
          new: true,
          confirm: false,
        });
      }
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className='content-wrapper'>
        <p className='form-title'>Reset Password</p>
        <div className='input-wrapper'>
          <div className='password'>
            <label htmlFor='password'>
              <b>New Password</b>
            </label>
            <input
              type={passwordView.new ? 'text' : 'password'}
              placeholder='Enter New Password'
              name='password'
              required
              id='new-password'
              className='border'
              ref={passwordRef}
              onKeyUp={() => {
                setModalDropDown(false);
              }}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
                setModalDropDown(true);
              }}
            />
            <img
              src='/eye.png'
              alt='password view toggle'
              id='eye'
              onClick={() => {
                passwordViewToggle('new');
              }}
            />
            <div className={modalDropDown ? 'validation visible' : 'validation'} id='validation'>
              <ul>
                <p className='caution'>You password must contain:</p>
                <li id='length' className={length.test(password) ? 'pass' : ''}>
                  At least 8 Characters
                </li>
                <li id='lower' className={lower.test(password) ? 'pass' : ''}>
                  Lower case letters (a-z)
                </li>
                <li id='upper' className={upper.test(password) ? 'pass' : ''}>
                  Upper case letters (A-Z)
                </li>
                <li id='number' className={number.test(password) ? 'pass' : ''}>
                  Numbers (0-9)
                </li>
                <li id='symbol' className={special.test(password) ? 'pass' : ''}>
                  Symbol (@,/)
                </li>
              </ul>
            </div>
          </div>
          <div className='password'>
            <label htmlFor='password'>
              <b>Confirm Password</b>
            </label>
            <input
              type={passwordView.confirm ? 'text' : 'password'}
              placeholder='Confirm Password'
              name='password'
              required
              id='confirm-password'
              className='border'
              ref={confirmPasswordRef}
            />
            <img
              src='/eye.png'
              alt='password view toggle'
              id='eye'
              onClick={() => {
                passwordViewToggle('confirm');
              }}
            />
          </div>
        </div>
        <LoginResetButton data={buttonData} />
      </div>
    </form>
  );
};

export default PasswordResetForm;
