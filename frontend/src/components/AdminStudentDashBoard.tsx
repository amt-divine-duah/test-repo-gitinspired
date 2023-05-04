import { useState } from 'react'
import '../Styles/admin-student.scss'
import Board from './Board'
import CreateUserModal from './CreateUserModal'

const AdminStudentDashBoard = () => {
  const [showCreateUserModal,setShowCreateUserModal] =useState(false)
  const handleShowCreateUserModal=()=>{
    setShowCreateUserModal(prev=>!prev)
  }
  return (
    <div className="admin-student">
       <Board users='Students'
        buttonInfo='Add new Student'
        message='Oops, no students created or uploaded yet. Click on any of the buttons above to get started'
        showModal={handleShowCreateUserModal}
       />
      {showCreateUserModal===true &&<CreateUserModal showModal={handleShowCreateUserModal} user='Student' />}
    </div>
  )
}

export default AdminStudentDashBoard