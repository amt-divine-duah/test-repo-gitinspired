import { useState } from 'react'
import '../Styles/admin-student.scss'
import Board from './Board'
import CreateUserModal from './CreateUserModal'
import Main from './Main'

const AdminStudentDashBoard = () => {
  const [showCreateUserModal,setShowCreateUserModal] =useState(false)
  const handleShowCreateUserModal=()=>{
    setShowCreateUserModal(prev=>!prev)
  }
  return (
    <Main header>
      <div className="admin-student">
        <Board
          users="Students"
          buttonInfo="Add new Student"
          message="Oops, no students created or uploaded yet. Click on any of the buttons above to get started"
          showModal={handleShowCreateUserModal}
        />
        {showCreateUserModal === true && (
          <CreateUserModal
            showModal={handleShowCreateUserModal}
            user="Student"
          />
        )}
      </div>
    </Main>
  );
}

export default AdminStudentDashBoard