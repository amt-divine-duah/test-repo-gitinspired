import { useState } from 'react'
import '../Styles/board.scss'
import Table from './Table'
import TableFooter from './TableFooter'

type Prop={
  users:string,
  buttonInfo:string
  message:string
  showAddUserModal: React.MouseEventHandler
  data:{
    id:string
    name:string
    email:string
  }[]
  userTableName:string
  showUploadModal:React.MouseEventHandler
}

const Board = ({users, buttonInfo,message,showAddUserModal,data,userTableName,showUploadModal}:Prop)=> {
  const [currentPage, setCurrentPage]= useState(1)
  const recordsPerPage= 3;
  const lastIndex= currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records =data.slice(firstIndex,lastIndex);
  const numberOfPages= Math.ceil(data.length/recordsPerPage)
  

  




  return (
    <div className='main-board'>
      <section className='admin-board'>

       <div className="main-board-header">
          <div>
            {data.length > 0 && <h1>{users}</h1>}
          </div>

          <div className='main-board-header-right'>
            <button className='main-board-btn' onClick={showAddUserModal}>{buttonInfo}<img src="./student-outline.png" alt="" /></button>
            <div className="upload-btn" onClick={showUploadModal}>
              <p>Upload</p>
              <img src="./cloud-upload.png" alt="" />
            </div>
          </div>
        </div>

       { data.length ===0 && <div className='main-board-body'>
        <div><img src="./main-page-image.png" alt="" /></div> 
          <p>{message}</p>
        </div>}
            {data.length>0 && <Table userTableName={userTableName} data={records} />}
           
        
      </section>

      { data.length >0 &&
              <TableFooter/>
            }
      
    </div>
  )
}

export default Board