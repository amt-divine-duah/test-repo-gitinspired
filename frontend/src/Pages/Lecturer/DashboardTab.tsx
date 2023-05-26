import { useContext } from 'react';
import Actionbar from '../../components/lecturer_dashboard/Actionbar';
import AssignmentCard from '../../components/lecturer_dashboard/AssignmentCard';
import LecturerView from '../../components/lecturer_dashboard/LecturerView';
import { SearchContext } from '../../components/lecturer_dashboard/SearchContext';
import useAssignmentData from '../../hooks/useAssignmentData';

const DashboardTab = () => {
  const { assignments } = useAssignmentData();
  const data = useContext(SearchContext);
  const word = data.word;

  const output =
    Array.isArray(assignments) &&
    assignments.filter((item) => {
      return word === '' ? item : (item.title.toLowerCase().includes(word.toLowerCase()) ? item : item.uniqueCode.toLowerCase().includes(word.toLowerCase()));
    });
  return (
    <LecturerView sidebar>
      <div className='main-content'>
        <div className='top-content'>
          <Actionbar />
          <h2>Assignment</h2>
        </div>
        <div className='wrapper'>
          {Array.isArray(output) &&
            output.map((item, index) => {
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
