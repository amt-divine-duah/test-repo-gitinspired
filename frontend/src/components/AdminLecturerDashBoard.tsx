import Board from "./Board";
import { useState } from "react";
import CreateUserModal from './CreateUserModal'
import UploadModal from "./UploadModal";
import '../Styles/admin-leturer.scss';


const AdminLecturerDashBoard = () => {
  const [showCreateUserModal,setShowCreateUserModal] =useState(false)
  const [showUploadModal, setShowUploadModal]= useState(false)
  const [lecturersData, setLecturersData]= useState([
    // {
    //   id:'1234',
    //   name:'Benstrong',
    //   email:'benstrong@gamil.com'
    // },
    // {
    //   id:'1234',
    //   name:'Benstrong',
    //   email:'benstrong@gamil.com'
    // }

  ])


  const handleShowCreateUserModal=()=>{
    setShowCreateUserModal(prev=>!prev)
  }

  const handleUploadModal=()=>{
    setShowUploadModal(prev=>!prev)
  }
  
  return (
    <div className="admin-lecturer-board">
       <Board users='Lecturers'
        buttonInfo='Add new Lecturer'
        message='Oops, no lecturer created or uploaded yet. Click on any of the buttons above to get started'
        showAddUserModal={handleShowCreateUserModal}
        showUploadModal={handleUploadModal}
        data ={lecturersData}
        userTableName="Staff ID"
        />
         {showCreateUserModal===true &&<CreateUserModal showModal={handleShowCreateUserModal} user='Lecturer' />}
         {showUploadModal===true && <UploadModal showUploadModal={handleUploadModal}/>}  
    </div>
  )
}

export default AdminLecturerDashBoard