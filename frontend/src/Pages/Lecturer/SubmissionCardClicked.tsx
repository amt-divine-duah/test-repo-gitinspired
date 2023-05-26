import Actionbar from '../../components/lecturer_dashboard/Actionbar';

const SubmissionCardClicked = () => {
  return (
    <div className='main-content'>
      <div className='top-content'>
        <Actionbar />
      </div>
      <div className='submission-wrap'>
        <div className='submissionClicked-container'>
          <div className='submission-details-container'>
            <div className='name-list'></div>
            <div className='submission-documents'>
              <div className='document-features'>
                <div className='snapshot'>
                  <div className='snapshot-button'>
                    <p>Snapshot 2</p>
                    <div className='button-image'>
                      <img src='/downarrow.png' alt='down-arrow' />
                    </div>
                  </div>
                  <div className='dropdown' id='dropdown'>
                    <ul>
                      <li>Snapshot 2</li>
                      <li>Snapshot 3</li>
                      <li>Snapshot 4</li>
                    </ul>
                  </div>
                </div>
                <div className='download-button'>
                  <p>Download Zip</p>
                  <div className='button-image'>
                    <img src='/download.png' alt='download-icon' />
                  </div>
                </div>
              </div>
              <div className='document-list'>
                <table></table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionCardClicked;
