import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';
import { StudentTableType } from '../../customTypesAndInterface/StudentCustomTypes';

const StudentsDashBoardTable = ({ tableTitles, tableData }: StudentTableType) => {
  const colors = ['rgba(251, 251, 251, 1)', '#fff'];
  const navigate = useNavigate();

  return (
    <div className='student-dashboard-table'>
      <table>
        <thead>
          <tr>
            {tableTitles?.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableData?.map((data, index) => (
            <tr
              key={index}
              style={{ backgroundColor: colors[index % colors.length] }}
              onClick={() => navigate(`./${data?.uniqueCode}`)}
            >
              <td>{data?.title}</td>
              <td className='description'>
                {new String(data?.description).length > 100
                  ? data?.description && parse(data.description.slice(0, 100) + '...')
                  : data?.description && parse(data?.description)}
              </td>
              <td>{data.deadline && new Date(data?.deadline)?.toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsDashBoardTable;
