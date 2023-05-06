import '../Styles/lecturerMainBoard.scss'
import Card from './Card'

const LecturerMainBoard = () => {
  return (
    <div className="lecturer-main-board">
     <header>
      <div className="left-side-of-header">
        <div className="searchbox">
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="right-side-of-header">
        <button>Filter by deadline</button>
        <button>Assignment+</button>
      </div>
     </header>
     <section>
      <h2>Assignment</h2>
     </section>
     <div className="card-section">
      <Card />
     </div>
    </div>
  )
}

export default LecturerMainBoard
