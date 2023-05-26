import { CircularProgress } from '@mui/joy';
import { BoardPropType } from '../../customTypesAndInterface/AdminCustomTypes';
import Table from '../Table';
import TableFooter from '../TableFooter';

const Board = ({
  users,
  buttonInfo,
  message,
  showAddUserModal,
  data,
  userTableName,
  showUploadModal,
}: BoardPropType) => {
  let contents;
  if (data === undefined) {
    contents = (
      <div className='landingPage'>
        <CircularProgress size='lg' />
      </div>
    );
  } else if (data?.length === 0) {
    contents = (
      <div className='main-board-body'>
        <img src='/main-page-image.png' alt='' />
        <p>{message}</p>
      </div>
    );
  } else if (data === null) {
    contents = (
      <div className='main-board-body'>
        <img src='/main-page-image.png' alt='' />
        <p>
          Oops, no {users} created or uploaded yet. Click on any of the buttons above to get started
        </p>
        ;
      </div>
    );
  } else {
    contents = <Table userTableName={userTableName} data={data} />;
  }

  return (
    <div className='main-board'>
      <section className='admin-board'>
        <div className='main-board-header'>
          <div> {data?.length !== undefined && data.length > 0 && <h1>{users}</h1>}</div>

          <div className='main-board-header-right'>
            <button className='main-board-btn' onClick={showAddUserModal}>
              {buttonInfo}
              <img
                src='https://github.com/amt-divine-duah/assets-folder/raw/main/student-outline.png'
                alt=''
              />
            </button>
            <div className='upload-btn' onClick={showUploadModal}>
              <p>Upload</p>
              <img
                src='https://github.com/amt-divine-duah/assets-folder/raw/main/cloud-upload.png'
                alt=''
              />
            </div>
          </div>
        </div>

        {contents}
      </section>

      {data?.length !== 0 && <TableFooter />}
    </div>
  );
};

export default Board;
