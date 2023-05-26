import { useEffect, useState } from 'react';
import Main from '../Main';
import api from '../../ApiClient';
import axios from 'axios';
import { Assignment } from '../../customTypesAndInterface/StudentCustomTypes';
import StudentsSubmissionTable from './StudentsSubmissionsTable';

const StudentSubmission = () => {
  const [TableTitles] = useState(['Title', 'Status', 'Description', 'Deadline']);
  const [data, setData] = useState<Assignment[] | null | undefined>(null);
  const [dataFilter, setDataFilter] = useState();

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

  const handleChange = (event: React.BaseSyntheticEvent) => {
    setDataFilter(event.target.value);
  };

  const sortByField = (field: string) => {
    const sortedData = [...(data as Assignment[])].sort((a, b) => {
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
    <main className='student-submission'>
      <Main studentHeader>
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
        </div>
        <StudentsSubmissionTable tableTitles={TableTitles} tableData={data} />
      </Main>
    </main>
  );
};

export default StudentSubmission;
