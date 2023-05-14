import '../Styles/Forbidden.scss';

const ForbiddenPage = () => {
  return (
    <div className="forbidden">
      <div className="error-code">
        <h1>
            403
        </h1>
      </div>
      <div className="text">
        <h5>Forbidden</h5>
      </div>
      <div className="redirect-text">
        <p>click to return to the HomePage</p>
      </div>
      <div className="redirect-btn">
      <button>HomePage</button>
      </div>
      
    </div>
  )
}

export default ForbiddenPage
