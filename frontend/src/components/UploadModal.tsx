import '../Styles/uploadModal.scss'


type Prop ={
    showUploadModal: React.MouseEventHandler
 }
const UploadModal = ({showUploadModal}:Prop) => {
    
  return (
    <div className='uploadModalContainer' onClick={showUploadModal}>
        <div className="uploadModal" onClick={(e)=>e.stopPropagation()}>
          <div className="upload-close-icon">
            <div><img src="/close-rounded.svg" alt=""  onClick={showUploadModal}/></div>
          </div>
            <div>
            <h2 className='upload-header'>Upload a file</h2>
            <p>Please upload a file to get started</p>
            </div>
          
            <div className="modalFileUpload">
                <img src="./Black and White Collection.png" alt="" />
                <label htmlFor="files" className="uploadbtn">Upload a file</label>
              <input id='files' type="file" multiple accept='.csv' />
              
                <p>or drop a file</p>
                <div className='upload-footer'>
                <h4>Only CSV file accepted</h4>
             <p className='second-p'>It must have a required columns of emails. firstname and lastname</p>
                </div>
             
            </div>
        </div>
    </div>
  )
}

export default UploadModal