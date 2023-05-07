import "../Styles/board.scss";
import { UserInterface } from "../interfaces/UserInterface";

type Prop = {
  users: string;
  buttonInfo: string;
  message: string;
  showAddUserModal: React.MouseEventHandler;
  data: UserInterface[];
  userTableName: string;
  showUploadModal: React.MouseEventHandler;
};

const Board = ({
  users,
  buttonInfo,
  message,
  showAddUserModal,
  data,
  userTableName,
  showUploadModal,
}: Prop) => {
  return (
    <div className="main-board">
      <section className="empty-board">
        <div className="main-board-header">
          <div>{data.length > 0 && <h1>{users}</h1>}</div>

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

        {data.length === 0 && (
          <div className="main-board-body">
            <img src="/main-page-image.png" alt="" />
            <p>{message}</p>
          </div>
        )}
        {data.length > 0 && (
          <div className="main-board-table">
            <table>
              <thead>
                <tr>
                  <th>{userTableName}</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: UserInterface, index): JSX.Element => (
                  <tr key={index}>
                    {item.studentId ? (
                      <td>{item.studentId}</td>
                    ) : (
                      <td>{item.staffId}</td>
                    )}
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Board;
