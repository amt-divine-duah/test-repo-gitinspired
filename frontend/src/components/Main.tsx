import React from 'react'
import NavBar from './NavBar'

interface MainProps {
    header?: boolean
    children: React.ReactNode
}

const Main = (props: MainProps) => {
  return (
    <>
    {props.header && <NavBar />}
    {props.children}
    </>
  )
}

export default Main