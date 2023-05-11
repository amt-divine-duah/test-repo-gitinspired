
const BottomContent = (prop: {invitedStudents: number}) => {
    return (
        <div className="clicked-bottom">
        <div className="clicked-header2">
          <h2 className="header-bottom">Students</h2>
          <div className="number-assigned">
            <p>{prop.invitedStudents} students</p>
            <img src="/add.png" alt="add-icon" />
          </div>
        </div>

        <div className="bottom-content">
          <table>
            <tr>
              <td>
                <div className="content-list">
                  <img src="/user 2.png" alt="icon" />
                  <div>
                    <p></p>
                    <p></p>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    )
}

export default BottomContent;