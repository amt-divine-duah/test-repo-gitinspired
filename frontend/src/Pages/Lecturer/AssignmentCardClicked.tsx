import Actionbar from '../../components/lecturer_dashboard/Actionbar';

const AssignmentCardClicked = () => {
  return (
    <div className='main-content'>
      <div className='top-content'>
        <Actionbar />
        <h2>Assignment</h2>
      </div>
      <div className='wrapper'>
        <div className='clicked-top'></div>
      </div>
    </div>
  );
};

export default AssignmentCardClicked;
