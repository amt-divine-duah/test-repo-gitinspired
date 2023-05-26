import React from 'react';
import api from '../../ApiClient';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { showErrorMessage, showSuccessMessage } from '../../constants/messages';
import { UserInterface, UploadFileType } from '../../customTypesAndInterface/AdminCustomTypes';
import _ from 'lodash';

const UploadModal = ({ showUploadModal, onBulkUpload, user, hideModal }: UploadFileType) => {
  const fileFieldRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  async function handleSubmit() {
    const imageFiles = fileFieldRef.current?.files || '';
    const formData = new FormData();
    if (imageFiles && imageFiles.length > 0) {
      for (let i = 0; i < imageFiles.length; i++) {
        formData.append('files', imageFiles[i]);
      }
    }
    try {
      const response = await api.post(`/api/admin/upload-${user}-info`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === StatusCodes.OK) {
        if (user === 'lecturer') {
          const keysToPick = ['staffId', 'firstName', 'lastName', 'email'];
          const results = _.map(response.data?.data, (obj) =>
            _.pick(obj, keysToPick),
          ) as UserInterface[];
          showSuccessMessage(response.data?.message);
          onBulkUpload(results);
        } else if (user === 'student') {
          const keysToPick = ['studentId', 'firstName', 'lastName', 'email'];
          const results = _.map(response.data?.data, (obj) =>
            _.pick(obj, keysToPick),
          ) as UserInterface[];
          showSuccessMessage(response.data?.message);
          onBulkUpload(results);
        }
      } else {
        showErrorMessage('Something went wrong');
        hideModal();
      }
      return;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
          if (
            typeof error.response?.data['error'] === 'object' &&
            Object.keys(error.response?.data['error']).length > 0
          ) {
            const firstKey = Object.keys(error.response?.data['error'])[0];
            const message = error.response?.data['error'][firstKey];
            showErrorMessage(message[0]);
            hideModal();
          } else {
            showErrorMessage(error.response?.data['message']);
            hideModal();
          }
          return;
        }
      } else {
        showErrorMessage('Something went wrong');
        hideModal();
        return;
      }
    }
  }

  return (
    <form
      className='uploadModalContainer'
      onClick={showUploadModal}
      encType='multipart/form-data'
      ref={formRef}
    >
      <div className='uploadModal' onClick={(e) => e.stopPropagation()}>
        <div className='upload-close-icon'>
          <div>
            <img src='/close-rounded.svg' alt='' onClick={showUploadModal} />
          </div>
        </div>
        <div>
          <h2 className='upload-header'>Upload a file</h2>
          <p className='header-p'>Please upload a file to get started</p>
        </div>

        <div className='modalFileUpload'>
          <img src='/Black and White Collection.png' alt='' />
          <label htmlFor='files' className='uploadbtn'>
            Upload a file
          </label>
          <input
            id='files'
            type='file'
            multiple
            accept='.csv'
            onChange={handleSubmit}
            ref={fileFieldRef}
          />

          <p>or drop a file</p>
          <div className='upload-footer'>
            <h4>Only CSV file accepted</h4>
            <p className='second-p'>
              It must have a required columns of emails. firstname and lastname
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UploadModal;
