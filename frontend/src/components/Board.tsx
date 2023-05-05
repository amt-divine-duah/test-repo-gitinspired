import '../Styles/board.scss'

type Prop={
  users:string,
  buttonInfo:string
  message:string
  showModal: React.MouseEventHandler
}

const Board = ({users, buttonInfo,message,showModal}:Prop)=> {
  return (
    <div className='main-board'>
      <section className='empty-board'>

       <div className="main-board-header">
          <div>
            <h1>{users}</h1>
          </div>

          <div className='main-board-header-right'>
            <button className='main-board-btn' onClick={showModal}>{buttonInfo}<img src="./student-outline.png" alt="" /></button>
            <div className="upload-btn">
              <p>Upload</p>
              <img src="./cloud-upload.png" alt="" />
            </div>
          </div>
        </div>

        <div className='main-board-body'>
          <img src="./main-page-image.png" alt="" />
          <p>{message}</p>
        </div>
      </section>

     
       
    </div>
  )
}

export default Board