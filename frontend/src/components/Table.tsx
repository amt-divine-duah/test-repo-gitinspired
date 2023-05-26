import { useState } from 'react';
import { TableDataType, UserInterface } from '../customTypesAndInterface/AdminCustomTypes';

const Table = ({ userTableName, data }: TableDataType) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data?.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(parseInt(String(data?.length)) / recordsPerPage);

  const PreviousPage = () => {
    if (currentPage != 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const NextPage = () => {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='main-board-table'>
      <table>
        <thead>
          <tr>
            <th>{userTableName}</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {records?.map(
            (item: UserInterface, index): JSX.Element => (
              <tr key={index}>
                {item.studentId ? <td>{item.studentId}</td> : <td>{item.staffId}</td>}
                <td>
                  {item.lastName} {item.firstName}
                </td>
                <td>{item.email}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
      <div className='table-footer'>
        <div className='footer-left-side'>
          <p>
            Page {currentPage % 5} of {numberOfPages}{' '}
          </p>
        </div>
        <div className='footer-right-side'>
          <button disabled={currentPage == 1} onClick={PreviousPage}>
            Prev
          </button>
          <button disabled={currentPage == numberOfPages} onClick={NextPage}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
