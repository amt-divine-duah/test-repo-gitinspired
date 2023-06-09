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
                    <th>Name</th>
                    <th>Email</th>
                  </tr>

                </thead>
                <tbody>
                {data.map((item: any,index): any=>(
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
  )
}

export default Table