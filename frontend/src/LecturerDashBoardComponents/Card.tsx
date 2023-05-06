import '../Styles/card.scss'

const Card = () => {
  return (
    <div className="card">
      <header className='card-header'>
        <h3>JAVASCRIPT</h3>
      </header>
      <section>
        <h4>Description</h4>
        <p>Your task is to develop a web application using
             JavaScript that provides 
            a user-friendly interface for tracking and managing tasks.</p>
      </section>
      <section>
        <p>1st May, 2023</p>
      </section>
      <section>
        <p>Unique Code</p>
        <div>
            <p>5867947</p>
            <img src="" alt="" />
        </div>
      </section>
    </div>
  )
}

export default Card
