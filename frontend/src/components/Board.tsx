import "../Styles/board.scss";
import Table from "./Table";
import { UserInterface } from "../interfaces/UserInterface";
import { CircularProgress } from "@mui/joy";
import { PaginationInfoInterface } from "../interfaces/PaginationInfoInterface";

type Prop = {
  users: string;
  buttonInfo: string;
  message: string;
  showAddUserModal: React.MouseEventHandler;
  data: UserInterface[] | undefined | null;
  userTableName: string;
  showUploadModal: React.MouseEventHandler;
  paginationInfo: PaginationInfoInterface | undefined;
  loadNextPage: any;
  loadPrevPage: any;
};

const Board = ({
  users,
  buttonInfo,
  message,
  showAddUserModal,
  data,
  userTableName,
  showUploadModal,
  paginationInfo,
  loadNextPage,
  loadPrevPage,
}: Prop) => {
  let contents;
  if (data === undefined) {
    contents = (
      <div className="landingPage">
        <CircularProgress size="lg" />
      </div>
    );
  } else if (data?.length === 0) {
    contents = (
      <div className="main-board-body">
        <img src="/main-page-image.png" alt="" />
        <p>{message}</p>
      </div>
    );
  } else if (data === null) {
    contents = <p>Could not retrieve student lists</p>;
  } else {
    contents = <Table userTableName={userTableName} data={data} />;
  }

  return (
    <div className="main-board">
      <section className="admin-board">
        <div className="main-board-header">
          <div>
            {data?.length !== undefined && data.length > 0 && <h1>{users}</h1>}
          </div>

          <div className="main-board-header-right">
            <button className="main-board-btn" onClick={showAddUserModal}>
              {buttonInfo}
              <img src="/student-outline.png" alt="" />
            </button>
            <div className="upload-btn" onClick={showUploadModal}>
              <p>Upload</p>
              <img src="/cloud-upload.png" alt="" />
            </div>
          </div>
        </div>

        {contents}
      </section>

      {paginationInfo?.hasNext || paginationInfo?.hasPrevious ? (
        <div className="footer">
          <div className="footer-left-side">
            <p>
              Page {paginationInfo.currentPage} of {paginationInfo.pages}
            </p>
          </div>
          <div className="footer-right-side">
            {paginationInfo?.hasPrevious ? (
              <button type="button" onClick={loadPrevPage}>
                Prev
              </button>
            ) : (
              <button type="button" disabled>
                Prev
              </button>
            )}

            {paginationInfo?.hasNext ? (
              <button type="button" onClick={loadNextPage}>
                Next
              </button>
            ) : (
              <button type="button" disabled>
                Next
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Board;
