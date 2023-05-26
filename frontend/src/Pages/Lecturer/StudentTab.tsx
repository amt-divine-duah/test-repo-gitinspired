import { CircularProgress } from '@mui/joy';
import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import Actionbar from '../../components/lecturer_dashboard/Actionbar';
import LecturerView from '../../components/lecturer_dashboard/LecturerView';
import { UserInterface } from '../../customTypesAndInterface/AdminCustomTypes';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { fetchLecturersStudent } from '../../store/features/LecturersStudentDataSlice';

const StudentTab = () => {
  const [studentList, setStudentList] = useState<UserInterface[] | null | undefined>();

  const dispatch = useAppDispatch();
  const { student } = useAppSelector((state) => state.lecturersStudentData);

  useEffect(() => {
    dispatch(fetchLecturersStudent());
    setStudentList(student);
  }, [student?.length, dispatch, student]);

  let contents;
  if (studentList === undefined) {
    contents = (
      <div className='main-content'>
        <div className='wrapper'>
          <CircularProgress size='lg' />
        </div>
      </div>
    );
  } else if (studentList?.length === 0) {
    contents = (
      <div className='main-content'>
        <p>cannot load data...</p>
      </div>
    );
  } else if (studentList === null) {
    contents = (
      <div className='main-content'>
        <p>
          Oops, nothing created or uploaded yet. Click on any of the buttons above to get started
        </p>
      </div>
    );
  } else {
    contents = <Table userTableName={'Student ID'} data={studentList && studentList} />;
  }

  return (
    <LecturerView sidebar>
      <div className='main-content'>
        <div className='top-content'>
          <Actionbar />
          <h2>Assignment</h2>
        </div>
        <div className='wrapper'>
          <div className='student-table'> {contents}</div>
        </div>
      </div>
    </LecturerView>
  );
};

export default StudentTab;
