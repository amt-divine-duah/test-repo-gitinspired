import { useNavigate } from "react-router-dom"


const ForbiddenPage = () => {

    const navigate = useNavigate()
    function handleClick() {
        console.log("Go Home")
        navigate("/")
    }

  return (
    <div>
        <h1>Access Forbidden</h1>
        <p>This page is forbidden</p>
        <button onClick={handleClick}>Home</button>
    </div>
  )
}

export default ForbiddenPage