import { StudentData } from '../../customTypesAndInterface/AdminCustomTypes';

const LecturerInviteStudentCard = ({
  studentData,
  setSelectedUsers,
  selectedUsers,
}: StudentData) => {
  const userInviteColor = ['#FFA9A9', '#A9EAFF', '#E9A9FF', '#FFA9A9'];

  const handleCheckboxChange = (userId: string) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  return (
    <div className='invite-student-container'>
      {studentData?.map((user, index) => (
        <div className='invite-student-card' key={index}>
          <div
            className='circle'
            style={{ backgroundColor: userInviteColor[index % userInviteColor.length] }}
          >
            {user.firstName[0]}
          </div>
          <div className='user-name-and-email'>
            <label htmlFor='user'>{user.firstName}</label>
            <p>{user.email}</p>
          </div>
          <div className='user-check-box-container'>
            <input
              type='checkbox'
              id={user.studentId}
              checked={selectedUsers.includes(user.studentId ?? '')}
              onChange={() => handleCheckboxChange(user.studentId ?? '')}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LecturerInviteStudentCard;
