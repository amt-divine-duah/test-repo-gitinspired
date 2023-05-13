import '../Styles/table.scss';

type Prop ={
    userTableName:string
    data :{
        id:string
        name:string
        email:string
    }[]
}

const Table = ({userTableName, data}:Prop) => {
  return (
    <div className="main-board-table">
              <table>
                <thead>
                  <tr>
                    <th>{userTableName}</th>
                    <th>name</th>
                    <th>email</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    data.map((item)=>(
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                      </tr>
                    ))
                  }
                </tbody>
                 
                
                
               
              </table>
            </div>
  )
}

export default Table