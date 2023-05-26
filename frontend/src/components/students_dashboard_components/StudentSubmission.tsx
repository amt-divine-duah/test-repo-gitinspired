import { useEffect, useState } from 'react';
import Main from '../Main';
import Students_Dashboard_Header from './StudentsDashboardHeader';
import api from '../../ApiClient';
import axios from 'axios';
import { Assignment } from '../../customTypesAndInterface/StudentCustomTypes';
import StudentsSubmissionTable from './StudentsSubmissionsTable';

const StudentSubmission = () => {
  const [TableTitles] = useState(['Title', 'Status', 'Description', 'Deadline']);
  const [data, setData] = useState<Assignment[] | null | undefined>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/api/student/submissions');
        setData(response.data?.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setData(undefined);
        } else {
          setData(undefined);
        }
      }
    })();
  }, [data?.length]);

  return (
    <main className='student-submission'>
      <Main studentHeader>
        <Students_Dashboard_Header />
        <StudentsSubmissionTable tableTitles={TableTitles} tableData={data} />
      </Main>
    </main>
  );
};

export default StudentSubmission;
