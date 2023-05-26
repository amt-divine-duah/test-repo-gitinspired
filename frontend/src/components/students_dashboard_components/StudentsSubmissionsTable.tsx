import { StudentTableTypeII } from '../../customTypesAndInterface/StudentCustomTypes';
import parse from 'html-react-parser';

const StudentsSubmissionsTable = ({ tableTitles, tableData }: StudentTableTypeII) => {
  const colors = ['rgba(251, 251, 251, 1)', '#fff'];

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
            <tr key={index} style={{ backgroundColor: colors[index % colors.length] }}>
              <td>{data['assignment']['title']}</td>
              <td>
                <span className='details-status'>Submitted</span>
              </td>
              <td className='description'>
                {data['assignment']['description'] && parse(data['assignment']['description'])}
              </td>
              <td>
                {data['assignment']['deadline'] &&
                  new Date(data['assignment']['deadline']).toDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsSubmissionsTable;
