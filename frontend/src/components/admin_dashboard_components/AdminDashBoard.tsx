import { useEffect, useState } from 'react';
import Main from '../Main';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { fetchLecturer } from '../../store/features/LecturerDataSlice';
import { fetchStudent } from '../../store/features/StudentDataSlice';
import { fetchAssignment } from '../../store/features/AssignmentDataSlice';
import { fetchSubmission } from '../../store/features/SubmissionsDataSlice';

const AdminMainDashBoard = () => {
  const dispatch = useAppDispatch();
  const { lecturer } = useAppSelector((state) => state.lecturer);
  const { student } = useAppSelector((state) => state.student);
  const { assignment } = useAppSelector((state) => state.assignment);
  const { submission } = useAppSelector((state) => state.submissions);

  const [studentData] = useState([
    {
      name: 'kofi',
      dueDate: 'June 24,22',
      status: false,
    },
    {
      name: 'john',
      dueDate: 'June 24,22',
      status: true,
    },
    {
      name: 'luke',
      dueDate: 'June 24,22',
      status: false,
    },
  ]);

  useEffect(() => {
    dispatch(fetchLecturer());
    dispatch(fetchStudent());
    dispatch(fetchAssignment());
    dispatch(fetchSubmission());
  }, [dispatch]);
  return (
    <Main>
      <div className='admin-main-dashboard-route'>
        <div className='left-admin-dashboard'>
          <div className='left-admin-dashboard-top'>
            <div className='admin-dashboard-header'>
              <div className='admin-header-text'>
                <h1>Welcome back, Admin</h1>
                <p>
                  Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et
                  velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora
                  torquent per conubia nostra, per inceptos himenaeos.
                </p>
              </div>
              <div className='admin-header-image'>
                <img src='/desktop-guy.svg' alt='' />
              </div>
            </div>
            <div className='overview'>Overview</div>
            <div className='overview-content'>
              {/* Lecturers */}
              <div className='overview-cards'>
                <div>
                  <div className='overview-image'>
                    <div>
                      <img src='/student-icon.svg' alt='lecturer-icon' />
                    </div>
                  </div>
                </div>

                <div className='overview-text'>
                  <h4>{lecturer?.length}</h4>
                  <p>Lecturers</p>
                </div>
              </div>
              {/* Students */}
              <div className='overview-cards'>
                <div>
                  <div className='overview-image'>
                    <div>
                      <img src='/student-icon.svg' alt='student-icon' />
                    </div>
                  </div>
                </div>

                <div className='overview-text'>
                  <h4>{student?.length}</h4>
                  <p>Students</p>
                </div>
              </div>
              {/* Assignments Created */}
              <div className='overview-cards'>
                <div>
                  <div className='overview-image'>
                    <div>
                      <img src='/assignment-created-icon.svg' alt='assignment-icon' />
                    </div>
                  </div>
                </div>

                <div className='overview-text'>
                  <h4>{assignment?.length}</h4>
                  <p>Assignment created</p>
                </div>
              </div>
              {/* Submissions Made */}
              <div className='overview-cards'>
                <div>
                  <div className='overview-image'>
                    <div>
                      <img src='/ic-job application.svg' alt='submission-icon' />
                    </div>
                  </div>
                </div>

                <div className='overview-text'>
                  <h4>{submission?.length}</h4>
                  <p>Submissions made</p>
                </div>
              </div>
            </div>
          </div>
          <div className='left-admin-dashboard-down'>
            <div className='students-progress'>Student Progress</div>
            <div className='student-progress-graph'>
              <img src='/Chart.png' alt='' />
            </div>
          </div>
        </div>
        <div className='right-admin-dashboard'>
          <div className='right-admin-dashboard-top'>
            <h4>Notifications</h4>
            <div className='notification-card-info'>
              <p>
                <img src='/user 2.png'></img>You have a bug that needs to b..
              </p>
              <p>Just now</p>
            </div>
          </div>

          <div className='right-admin-dashboard-down'>
            <h4>Assignment status</h4>

            <table>
              <thead>
                <tr>
                  <th>Students</th>
                  <th>Due date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.dueDate}</td>
                    <td className={item.status === true ? 'green' : 'blue'}>
                      <div className={item.status === true ? 'completed' : 'in-progress'}></div>
                      {item.status === true ? 'completed' : 'In progress'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default AdminMainDashBoard;
