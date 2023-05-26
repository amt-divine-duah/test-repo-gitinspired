interface EditAssignment {
  data:any;
  showAddUserModal?:any
}

const BottomContent = (prop: EditAssignment) => {
  const data = prop.data;
  return (
    <div className='clicked-card'>
      <div className='bottom-information'>
        <h2 className='bottom-content-header'>Students</h2>
        <div className='student-participation'>
          <p>{data.length} students</p>
          <img src='/add.png' alt='icon' className='add' onClick={prop.showAddUserModal} />
        </div>
      </div>
      <div className='bottom-table-wrapper'>
        <table>
          <tbody>
            
         {  Array.isArray(data) && data.map((item,index) => ( <tr>
              <td key={index}>
                <div className='content-list'>
                  <img src='/user 2.png' alt='icon' />
                  <p>{item.student.email}</p>
                </div>
              </td>
            </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BottomContent;

