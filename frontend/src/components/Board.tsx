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
  return (
    <div className='main-board'>
      <section className='empty-board'>

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
            {data.length>0 && <Table userTableName={userTableName} data={data} />}
        <div className="footer">
        <div className="footer-left-side">
          <p>Page 1 of 3</p>
        </div>
        <div className="footer-right-side">
            <button>Prev</button>
            <button>Next</button>
        </div>
      </div>
      </section>
      

     
      
    </div>
  )
}

export default Board