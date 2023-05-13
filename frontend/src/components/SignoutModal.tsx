import '../Styles/signOutModal.scss';

type Prop={
  handleLogout:React.MouseEventHandler;
}
const SignoutModal = ({handleLogout}:Prop) => {
  
  return (
    <div className="container" onClick={handleLogout}>
        <div className="signOutModal" onClick={(e)=>e.stopPropagation()}>
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout from <span className='logoutBoldText'>Assign IT Dashboard?</span></p>
            <div className="logout-btns">
                <button onClick={handleLogout}>Cancel</button>
                <button>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default SignoutModal
