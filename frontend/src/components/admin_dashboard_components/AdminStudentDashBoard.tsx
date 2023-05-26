import { useEffect, useState } from 'react';
import { UserInterface } from '../../customTypesAndInterface/AdminCustomTypes';
import Main from '../Main';
import Board from './Board';
import CreateUserModal from './CreateUserModal';
import UploadModal from './UploadModal';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { fetchStudent } from '../../store/features/StudentDataSlice';

const AdminStudentDashBoard = () => {
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [studentData, setStudentData] = useState<UserInterface[] | undefined | null>();
  const handleShowCreateUserModal = () => {
    setShowCreateUserModal((prev) => !prev);
  };
  const dispatch = useAppDispatch();
  const { student } = useAppSelector((state) => state.student);

  const handleUploadModal = () => {
    setShowUploadModal((prev) => !prev);
  };

  const handleCreateUser = (newUser: UserInterface) => {
    setStudentData((prevData) => {
      if (prevData === undefined || prevData === null) {
        return [newUser];
      } else {
        return [newUser, ...prevData];
      }
    });
    setShowCreateUserModal((prev) => !prev);
  };

  function handleBulkUpload(newUsers: UserInterface[]) {
    setStudentData((prevData) => {
      if (prevData === undefined || prevData === null) {
        return [...newUsers];
      } else {
        return [...newUsers, ...prevData];
      }
    });
  }

  function handleHideModal() {
    setShowUploadModal((prev) => !prev);
  }

  useEffect(() => {
    dispatch(fetchStudent());
    setStudentData(student);
  }, [dispatch, student]);

  return (
    <Main header>
      <div className='admin-student'>
        <Board
          users='Students'
          buttonInfo='Add new Student'
          message='Oops, no students created or uploaded yet. Click on any of the buttons above to get started'
          data={studentData && studentData}
          showAddUserModal={handleShowCreateUserModal}
          userTableName='Student ID'
          showUploadModal={handleUploadModal}
        />

        {showCreateUserModal === true && (
          <CreateUserModal
            showModal={handleShowCreateUserModal}
            user='student'
            onCreateUser={handleCreateUser}
          />
        )}
        {showUploadModal === true && (
          <UploadModal
            showUploadModal={handleUploadModal}
            user='student'
            onBulkUpload={handleBulkUpload}
            hideModal={handleHideModal}
          />
        )}
      </div>
    </Main>
  );
};

export default AdminStudentDashBoard;
