import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { fetchStudentAssignedAssignment } from '../../store/features/StudentsAssignedAssignmentSlice';
import { StudentAssignment } from '../lecturer_dashboard/LecturerCustomTypes';

const StudentAssignmentDetails = () => {
  const tableid = useParams();
  const uniqueCode = String(Object.values(tableid));

  const dispatch = useAppDispatch();
  const { assignment } = useAppSelector((state) => state.studentAssignedAssignment);
  const [data, setData] = useState<StudentAssignment[] | null | undefined>([]);

  const filteredData = data?.filter((data) => data.uniqueCode === uniqueCode);

  useEffect(() => {
    dispatch(fetchStudentAssignedAssignment());
    setData(assignment);
  }, [assignment?.length]);

  return (
    <>
      {filteredData?.map((data) => (
        <div className='students-assignment-details-wrapper'>
          <div className='assignment-details-header'>
            <div className='assignment-header-left'>
              <h1>{data?.title}</h1>

              <div className='not-submitted-with-image'>
                <div className='img'>
                  <img src='/not submitted.svg' alt='' />
                </div>
                <p>Not submitted</p>
              </div>
            </div>
            <div className='assignment-header-right'>
              <p>Due on</p>
              <p>{new Date(data.deadline).toDateString()}</p>
            </div>
          </div>

          <div className='assignment-details-body'>
            <h3>Description</h3>
            <div className='assignment-main-details'>
              <p>{parse(data.description)}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default StudentAssignmentDetails;
