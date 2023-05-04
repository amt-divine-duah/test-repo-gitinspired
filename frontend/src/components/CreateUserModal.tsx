import '../Styles/createUserModal.scss'

type Prop ={
   user:string
   showModal: React.MouseEventHandler
}

const CreateUserModal = ({showModal,user}:Prop) => {
  return (
    <div className="createUserContainer" onClick={showModal}>
       <div className="createUserModal" onClick={(e)=>{e.stopPropagation()}}>
        <h2>Tell us a little about the {user} you are adding</h2>
        <p>Please fill the following details to get started </p>
        
        <form className='create-user-form'>
            <div className='modal-input'>
               <input type="text" placeholder='Email' />
               <input type="text" placeholder='Firstname' />
               <input type="text" placeholder='lastname' />
            </div>

           <button>Create</button>
        </form>
       </div>
    </div>
  )
}

export default CreateUserModal