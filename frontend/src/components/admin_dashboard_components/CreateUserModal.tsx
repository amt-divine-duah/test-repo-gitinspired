import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import React, { useEffect } from 'react';
import api from '../../ApiClient';
import { showErrorMessage, showSuccessMessage } from '../../constants/messages';
import {
  CreateUserPropType,
  FormErrors,
  UserInterface,
} from '../../customTypesAndInterface/AdminCustomTypes';

const CreateUserModal = ({ showModal, user, onCreateUser }: CreateUserPropType) => {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const firstnameRef = React.useRef<HTMLInputElement>(null);
  const lastnameRef = React.useRef<HTMLInputElement>(null);

  const [formErrors, setFormErrors] = React.useState<FormErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = emailRef.current?.value ?? '';
    const lastname = lastnameRef.current?.value ?? '';
    const firstname = firstnameRef.current?.value ?? '';
    const formBody = { email, firstname, lastname };
    try {
      const response = await api.post(`/api/admin/create-${user}`, formBody);
      if (response.status === StatusCodes.OK) {
        if (user === 'student') {
          const student: UserInterface = {
            studentId: response.data?.data['studentId'],
            firstName: `${response.data?.data['firstName']}`,
            lastName: `${response.data?.data['lastName']}`,
            email: response.data?.data['email'],
          };
          setFormErrors({});
          showSuccessMessage(response.data?.message);
          onCreateUser(student);
        } else if (user === 'lecturer') {
          const lecturer: UserInterface = {
            staffId: response.data?.data['staffId'],
            firstName: `${response.data?.data['firstName']}`,
            lastName: `${response.data?.data['lastName']}`,
            email: response.data?.data['email'],
          };
          setFormErrors({});
          showSuccessMessage(response.data?.message);
          onCreateUser(lecturer);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
          setFormErrors(error.response?.data['error']);
          return;
        } else {
          setFormErrors({});
          showErrorMessage('Something went wrong');
          return;
        }
      }
    }
  }

  useEffect(() => {
    if (formErrors['email']?.[0]) {
      showErrorMessage(formErrors['email']?.[0]);
    } else if (formErrors['firstname']?.[0]) {
      showErrorMessage(formErrors['firstname']?.[0]);
    } else if (formErrors['lastname']?.[0]) {
      showErrorMessage(formErrors['lastname']?.[0]);
    }
  }, [formErrors]);

  return (
    <div className='container' onClick={showModal}>
      <div
        className='createUserModal'
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2>Tell us a little about the {_.capitalize(user)} you are adding</h2>
        <p>Please fill the following details to get started </p>

        <form className='create-user-form' onSubmit={handleSubmit}>
          <div className='modal-input'>
            <input type='email' placeholder='Email' name='email' required ref={emailRef} />
            <input
              type='text'
              placeholder='Firstname'
              name='firstname'
              required
              ref={firstnameRef}
            />
            <input type='text' placeholder='lastname' name='lastname' required ref={lastnameRef} />
          </div>

          <button>Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
