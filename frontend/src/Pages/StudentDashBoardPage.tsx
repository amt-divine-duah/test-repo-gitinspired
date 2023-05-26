import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Main from '../components/Main';
import Students_DashBoard_Table from '../components/students_dashboard_components/StudentsDashBoardTable';
import Students_Dashboard_Header from '../components/students_dashboard_components/StudentsDashboardHeader';
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

  useEffect(() => {
    dispatch(fetchStudentAssignedAssignment());
    setData(assignment);
  }, [assignment?.length]);

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
            <Students_Dashboard_Header />
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
