import '../Styles/uploadModal.scss'


type Prop ={
    showUploadModal: React.MouseEventHandler
 }
const UploadModal = ({showUploadModal}:Prop) => {
    
  return (
    <div className='uploadModalContainer' onClick={showUploadModal}>
        <div className="uploadModal" onClick={(e)=>e.stopPropagation()}>
            <h2>Upload a file</h2>
            <p>Please upload a file to get started</p>
            <div className="modalFileUpload">
                <img src="./Black and White Collection.png" alt="" />
                <label htmlFor="files" className="uploadbtn">Upload a file</label>
              <input id='files' type="file" />
                <p>or drop a file</p>
                <h3>Only CSV file accepted</h3>
             <p>It must have a required columns of emails. firstname and lastname</p>
            </div>
        </div>
    </div>
  )
}

export default UploadModal