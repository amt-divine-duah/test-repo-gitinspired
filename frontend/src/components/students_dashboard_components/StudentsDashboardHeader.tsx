import FilterByDeadlineButton from './FilterByDeadlineButton';

const StudentsDashboardHeader = () => {
  return (
    <div className='students-dashboard-header'>
      <div className='student-filter'>
        <FilterByDeadlineButton />
      </div>

      <h1>All Assignment</h1>
    </div>
  );
};

export default StudentsDashboardHeader;
