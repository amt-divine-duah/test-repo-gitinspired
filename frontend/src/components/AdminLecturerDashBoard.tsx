import Board from "./Board";
import { useState } from "react";
import CreateUserModal from './CreateUserModal'
import Main from "./Main";


const AdminLecturerDashBoard = () => {
  const [showCreateUserModal,setShowCreateUserModal] =useState(false)
  const handleShowCreateUserModal=()=>{
    setShowCreateUserModal(prev=>!prev)
  }
  
  return (
    <Main header>
      <div>
        <Board
          users="Lecturers"
          buttonInfo="Add new Lecturer"
          message="Oops, no lecturer created or uploaded yet. Click on any of the buttons above to get started"
          showModal={handleShowCreateUserModal}
        />
        {showCreateUserModal === true && (
          <CreateUserModal
            showModal={handleShowCreateUserModal}
            user="Lecturer"
          />
        )}
      </div>
    </Main>
  );
}

export default AdminLecturerDashBoard