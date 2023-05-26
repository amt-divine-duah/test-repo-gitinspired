import LecturerInviteStudentCard from "./LecturerInviteStudentCard"


const LecturerAddStudentModal = ({users,setSelectedUsers,selectedUsers}:any) => {
  return (
    <div className='create-assignment-modal-container'>
      <form className='add-assignment-modal' onClick={(e) => e.stopPropagation()}>
        <div className='lecturer-add-student-content'>
          <div className='modal-right-side'>
            <h3>Invite Student</h3>
            <LecturerInviteStudentCard
              studentData={users}
              setSelectedUsers={setSelectedUsers}
              selectedUsers={selectedUsers}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default LecturerAddStudentModal