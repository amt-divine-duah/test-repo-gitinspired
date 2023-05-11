
const TopContent = (prop: {title: string, uniqueCode: string, date: string, details: string}) => {
    return (
        <div className="top-content">
        <div className="title-code">
          <div className="name-title">
            <p>{prop.title}</p>
          </div>
          <div className="copy-code">
            <p>Unique Code</p>
            <div className="copy">
              <p>{prop.uniqueCode}</p>
              <img src="/copy.png" alt="copy" />
            </div>
          </div>
        </div>
        <div>
          <div className="created">
            <p>Description</p>
            <p>{prop.date}</p>
          </div>
          <div className="full-details">
            <p> {prop.details} </p>
          
          </div>
        </div>
      </div>
    )
}

export default TopContent;