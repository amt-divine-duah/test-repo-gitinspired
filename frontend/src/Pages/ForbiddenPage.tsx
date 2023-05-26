import { useNavigate } from 'react-router-dom';

const ForbiddenPage = () => {
  const navigate = useNavigate();
  function handleClick() {
    navigate('/');
  }

  return (
    <div className='forbidden'>
      <div className='error-code'>
        <h1>403</h1>
      </div>
      <div className='text'>
        <h3>Access Forbidden</h3>
      </div>
      <div className='redirect-text'>
        <p>click to return to the HomePage</p>
      </div>
      <div className='redirect-btn'>
        <button onClick={handleClick}>HomePage</button>
      </div>
    </div>
  );
};

export default ForbiddenPage;
