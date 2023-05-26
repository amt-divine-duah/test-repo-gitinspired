import { useLocation } from 'react-router-dom';
import Actionbar from '../../components/lecturer_dashboard/Actionbar';
import BottomContent from '../../components/lecturer_dashboard/BottomContent';
import LecturerView from '../../components/lecturer_dashboard/LecturerView';
import TopContent from '../../components/lecturer_dashboard/TopContent';
import useAssignmentCardClicked from '../../hooks/useAssignmentCardClicked';

const AssignmentCardClicked = () => {
  const keyId = useLocation();
  const cardInformationToDisplay = keyId.state.name;
  const {studentsdata, assignmentsdata} = useAssignmentCardClicked(cardInformationToDisplay);

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
          <BottomContent data={studentsdata}/>
        </div>
      </div>
    </LecturerView>
  );
};

export default AssignmentCardClicked;
