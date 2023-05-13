import { useState, PropsWithChildren } from "react";
import NavBar from "../components/NavBar"
import '../Styles/homePage.scss'



const HomePage = ({children}:PropsWithChildren) => {
  const [linkData]=useState([
    {
      route:"",
      routeName:"Dashboard"
    },
    {
      route:"student",
      routeName:"Student"
    },
    {
      route:"lecturer",
      routeName:"Lecturer"
    },
  ])
  return (
    <main className="home">
      <NavBar linkData={linkData} backgroundColor={'linear-gradient(180deg, #170E7D 0%, #15104E 100%'}/>
      {children}
    </main>
  )
}

export default HomePage