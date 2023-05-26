import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Main from '../components/Main';
import Students_DashBoard_Table from '../components/students_dashboard_components/StudentsDashBoardTable';
import { useAppDispatch, useAppSelector } from '../hooks/useTypedSelector';
import { fetchStudentAssignedAssignment } from '../store/features/StudentsAssignedAssignmentSlice';
import { StudentAssignment } from '../components/lecturer_dashboard/LecturerCustomTypes';
const StudentDashBoardPage = () => {
  const [assignmentData] = useState([]);
  const [TableTitles] = useState(['Title', 'Description', 'Deadline']);
  const { tableid } = useParams();
  const dispatch = useAppDispatch();
  const { assignment } = useAppSelector((state) => state.studentAssignedAssignment);
  const [data, setData] = useState<StudentAssignment[] | null | undefined>([]);
  const [dataFilter, setDataFilter] = useState();

  useEffect(() => {
    dispatch(fetchStudentAssignedAssignment());
    setData(assignment);
  }, [assignment?.length]);

  const handleChange = (e: any) => {
    setDataFilter(e.target.value);
  };

  const sortByField = (field: string) => {
    const sortedData = [...(data as StudentAssignment[])].sort((a, b) => {
      if (field === 'ascending' && dataFilter === field) {
        return a.deadline.localeCompare(b.deadline);
      } else if (field === 'descending' && dataFilter === field) {
        return b.deadline.localeCompare(a.deadline);
      } else {
        return 0;
      }
    });
    setData(sortedData);
  };

  return (
    <main className='studentDashBoardPage'>
      <Main studentHeader>
        {assignmentData.length === 1 ? (
          <div className='empty-student-board'>
            <h1>All Assignment</h1>
            <div className='empty-student-board-body'>
              <div className='empty-body-image'>
                <img src='/Group1.svg' alt='' />
              </div>
              <h2>No assignment yet. Kindly contact your lecturer</h2>
            </div>
          </div>
        ) : (
          <div>
            <div className='students-dashboard-header'>
              <div className='student-filter'>
                <select
                  className='select-menu'
                  name=''
                  id=''
                  onChange={handleChange}
                  onClick={(e) => sortByField(e.currentTarget.value)}
                >
                  <option value='' defaultValue={'default'}>
                    Filter by deadline
                  </option>
                  <option value='ascending'>ascending</option>
                  <option value='descending'>descending</option>
                </select>
              </div>

              <h1>All Assignment</h1>
            </div>
            {tableid ? (
              <Outlet />
            ) : (
              <Students_DashBoard_Table tableTitles={TableTitles} tableData={data} />
            )}
          </div>
        )}
      </Main>
    </main>
  );
};

export default StudentDashBoardPage;
