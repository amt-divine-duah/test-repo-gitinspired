import Actionbar from '../../components/lecturer_dashboard/Actionbar';
import AssignmentCard from '../../components/lecturer_dashboard/AssignmentCard';
import LecturerView from '../../components/lecturer_dashboard/LecturerView';
import useAssignmentData from '../../hooks/useAssignmentData';

const DashboardTab = () => {
  const { assignments } = useAssignmentData();
  return (
    <LecturerView sidebar>
      <div className='main-content'>
        <div className='top-content'>
          <Actionbar />
          <h2>Assignment</h2>
        </div>
        <div className='wrapper'>
          {Array.isArray(assignments) &&
            assignments.map((item, index) => {
              return (
                <AssignmentCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  deadline={item.deadline}
                  uniqueCode={item.uniqueCode}
                  id={item.id}
                />
              );
            })}
        </div>
      </div>
    </LecturerView>
  );
};

export default DashboardTab;
