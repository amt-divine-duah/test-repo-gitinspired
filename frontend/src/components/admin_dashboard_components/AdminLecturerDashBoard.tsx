import { useEffect, useState } from 'react';
import { UserInterface } from '../../customTypesAndInterface/AdminCustomTypes';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { fetchLecturer } from '../../store/features/LecturerDataSlice';
import Main from '../Main';
import Board from './Board';
import CreateUserModal from './CreateUserModal';
import UploadModal from './UploadModal';

const AdminLecturerDashBoard = () => {
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [lecturersData, setLecturersData] = useState<UserInterface[] | undefined | null>();
  const dispatch = useAppDispatch();
  const { lecturer } = useAppSelector((state) => state.lecturer);
  const handleCreateUser = (newUser: UserInterface) => {
    setLecturersData((prevData) => {
      if (prevData === undefined || prevData === null) {
        return [newUser];
      } else {
        return [newUser, ...prevData];
      }
    });
    setShowCreateUserModal((prev) => !prev);
  };
  const handleShowCreateUserModal = () => {
    setShowCreateUserModal((prev) => !prev);
  };

  const handleUploadModal = () => {
    setShowUploadModal((prev) => !prev);
  };

  function handleHideModal() {
    setShowUploadModal((prev) => !prev);
  }

  function handleBulkUpload(newUsers: UserInterface[]) {
    setLecturersData((prevData) => {
      if (prevData === undefined || prevData === null) {
        return [...newUsers];
      } else {
        return [...newUsers, ...prevData];
      }
    });
  }
  useEffect(() => {
    dispatch(fetchLecturer());
    setLecturersData(lecturer);
  }, [lecturer]);

  return (
    <Main header>
      <div className='admin-lecturer-board'>
        <Board
          users='Lecturers'
          buttonInfo='Add new Lecturer'
          message='Oops, no lecturer created or uploaded yet. Click on any of the buttons above to get started'
          data={lecturersData && lecturersData}
          showAddUserModal={handleShowCreateUserModal}
          userTableName='Staff ID'
          showUploadModal={handleUploadModal}
        />

        {showCreateUserModal === true && (
          <CreateUserModal
            showModal={handleShowCreateUserModal}
            user='lecturer'
            onCreateUser={handleCreateUser}
          />
        )}
        {showUploadModal === true && (
          <UploadModal
            showUploadModal={handleUploadModal}
            user='lecturer'
            onBulkUpload={handleBulkUpload}
            hideModal={handleHideModal}
          />
        )}
      </div>
    </Main>
  );
};

export default AdminLecturerDashBoard;
