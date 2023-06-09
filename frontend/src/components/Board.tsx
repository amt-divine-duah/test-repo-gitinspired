import { useState } from 'react'
import '../Styles/board.scss'
import Table from './Table'

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
  
  const nextPage=()=>{
   
    if(currentPage===numberOfPages){
      return currentPage===lastIndex
    }
  
    setCurrentPage(prev=>prev+1)
  }

  const previousPage=()=>{
   
    if(currentPage===firstIndex){
      return currentPage===firstIndex
    }
    setCurrentPage(prev=>prev-1)
  }

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
         <img src="./main-page-image.png" alt="" />
          <p>{message}</p>
        </div>}
            {data.length>0 && <Table userTableName={userTableName} data={records} />}
           
        
      </section>

      { data.length >0 &&
              <div className="footer">
              <div className="footer-left-side">
                <p>Page {currentPage} of {numberOfPages}</p>
              </div>
              <div className="footer-right-side">
                  { currentPage===1?<button  type='button' disabled onClick={previousPage}>Prev</button>:<button onClick={previousPage}>Prev</button>}
                  {currentPage===numberOfPages  ? <button type='button' disabled onClick={nextPage}>Next</button>: <button onClick={nextPage}>Next</button>}
              </div>
            </div>
            }
      
    </div>
  )
}

export default Board