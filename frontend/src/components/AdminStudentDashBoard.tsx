import { useState } from 'react'
import '../Styles/admin-student.scss'
import Board from './Board'
import CreateUserModal from './CreateUserModal'
import UploadModal from './UploadModal'


const AdminStudentDashBoard = () => {
  const [showCreateUserModal,setShowCreateUserModal] =useState(false)
  const [showUploadModal, setShowUploadModal]= useState(false)
  const [studentData]= useState([
    {
      id:'1234',
      name:'I am a Student',
      email:'benstrong@gamil.com'
    },
    {
      id:'1234',
      name:'Benstrong',
      email:'benstrong@gamil.com'
    },
    {
      id:'1234',
      name:'Benstrong',
      email:'benstrong@gamil.com'
    },  
    {
      id:'1234',
      name:'Benstrong',
      email:'benstrong@gamil.com'
    },
    {
      id:'1234',
      name:'Benstrong',
      email:'benstrong@gamil.com'
    }

  ])

  const handleShowCreateUserModal=()=>{
    setShowCreateUserModal(prev=>!prev)
  }

  const handleUploadModal=()=>{
    setShowUploadModal(prev=>!prev)
  }
  return (
    <div className="admin-student">
       <Board users='Students'
        buttonInfo='Add new Student'
        message='Oops, no students created or uploaded yet. Click on any of the buttons above to get started'
        showAddUserModal={handleShowCreateUserModal}
        showUploadModal={handleUploadModal}
        data ={studentData}
        userTableName="Student ID"
       />
      {showCreateUserModal===true && <CreateUserModal showModal={handleShowCreateUserModal} user='Student' />}
      {showUploadModal===true && <UploadModal showUploadModal={handleUploadModal}/>} 
     
    </div>
  )
}

export default AdminStudentDashBoard