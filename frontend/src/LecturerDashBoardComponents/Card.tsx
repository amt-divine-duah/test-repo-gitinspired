import '../Styles/card.scss'
import { Link } from 'react-router-dom'

const Card = () => {
  return (
    <Link to={'/assignment-details'}>
       <div className="card">
      <header className='card-header'>
        <h3>JAVASCRIPT</h3>
      </header>
      <div className="card-body">
      <section className='card-main'>
        <h4>Description</h4>
        <p>Your task is to develop a web application using
             JavaScript that provides 
            a user-friendly interface for tracking and managing tasks.</p>
      </section>
      <section className='date-and-image'>
        <p>1st May, 2023</p>
        <img src="./invite.png" alt="" />
      </section>
      <section className= 'card-unique-code-container'>
        <p>Unique Code</p>
        <div className='card-unique-code-and-image'>
            <p>5867947</p>
            <img src="./doubleSquare.png" alt="" />
        </div>
      </section>
      </div>
     
    </div> 
    </Link>
  
  )
}

export default Card
