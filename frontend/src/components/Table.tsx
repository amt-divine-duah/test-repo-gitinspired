import "../Styles/table.scss";
import { UserInterface } from "../interfaces/UserInterface";

type Prop = {
  userTableName: string;
  data: UserInterface[];
};

const Table = ({ userTableName, data }: Prop) => {
  return (
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
          {data.map(
            (item: UserInterface, index): JSX.Element => (
              <tr key={index}>
                {item.studentId ? (
                  <td>{item.studentId}</td>
                ) : (
                  <td>{item.staffId}</td>
                )}
                <td>
                  {item.lastName} {item.firstName}
                </td>
                <td>{item.email}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
