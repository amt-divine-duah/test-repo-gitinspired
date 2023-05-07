import Board from "./Board";
import { useState } from "react";
import CreateUserModal from "./CreateUserModal";
import UploadModal from "./UploadModal";
import Main from "./Main";
import { UserInterface } from "../interfaces/UserInterface";

const AdminLecturerDashBoard = () => {
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [lecturersData, setLecturersData] = useState<UserInterface[]>([]);

  const handleCreateUser = (newUser: UserInterface) => {
    setLecturersData((prevData) => [...prevData, newUser]);
    setShowCreateUserModal((prev) => !prev);
  };

  const handleShowCreateUserModal = () => {
    setShowCreateUserModal((prev) => !prev);
  };

  const handleUploadModal = () => {
    setShowUploadModal((prev) => !prev);
  };

  return (
    <Main header>
      <div>
        <Board
          users="Lecturers"
          buttonInfo="Add new Lecturer"
          message="Oops, no lecturer created or uploaded yet. Click on any of the buttons above to get started"
          showAddUserModal={handleShowCreateUserModal}
          showUploadModal={handleUploadModal}
          data={lecturersData}
          userTableName="Staff ID"
        />
        {showCreateUserModal === true && (
          <CreateUserModal
            showModal={handleShowCreateUserModal}
            user="lecturer"
            onCreateUser={handleCreateUser}
          />
        )}
        {showUploadModal === true && (
          <UploadModal showUploadModal={handleUploadModal} />
        )}
      </div>
    </Main>
  );
};

export default AdminLecturerDashBoard;
