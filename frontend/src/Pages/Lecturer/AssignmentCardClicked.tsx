import { useLocation } from 'react-router-dom';
import Actionbar from '../../components/lecturer_dashboard/Actionbar';
import LecturerView from '../../components/lecturer_dashboard/LecturerView';
import useAssignmentCardClicked from '../../hooks/useAssignmentCardClicked';
import TopContent from '../../components/lecturer_dashboard/TopContent';
import BottomContent from '../../components/lecturer_dashboard/BottomContent';
import LecturerAddStudentModal from '../../components/lecturer_dashboard/LecturerAddStudentModal';
import { useState } from 'react';

const AssignmentCardClicked = () => {
  const keyId = useLocation();
  const cardInformationToDisplay = keyId.state.name;
  const {studentsdata, assignmentsdata} = useAssignmentCardClicked(cardInformationToDisplay);
  const [showUserModal,setShowUserModal]=useState(false)

  console.log(assignmentsdata,'assignment Data settings');
  const handleShowAddUserModal =()=>{
      setShowUserModal(prev=>!prev)
  }

  return (
    <LecturerView sidebar>
      <div className='main-content'>
        <div className='top-content'>
          <Actionbar />
          <h2>Assignment</h2>
        </div>
        <div className='wrapper'>
          <div className='clicked-top'>
          <TopContent
                title={assignmentsdata&& assignmentsdata.title}
                uniqueCode={assignmentsdata?.uniqueCode}
                deadline={assignmentsdata?.deadline}
                description={assignmentsdata?.description}
              />
           
          </div>
          <BottomContent data={studentsdata} showAddUserModal={handleShowAddUserModal}/>
        </div>
        
      </div>
      {showUserModal && <LecturerAddStudentModal showAddUserModal={handleShowAddUserModal} setShowUserModal={setShowUserModal}/>}
    </LecturerView>
  );
};

export default AssignmentCardClicked;
