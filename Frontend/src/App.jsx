import React, { useContext } from 'react'
import Signup from './pages/Signup'
import {Routes, Route, Navigate} from "react-router-dom"
import Login from './pages/Login'
import ToDoPage from './pages/ToDoPage'
import { AuthDataContext } from '../Context/AuthContext'

const App = () => {
  const {AuthUser} = useContext(AuthDataContext)

  return (
    <div className='h-screen '>
      <Routes>
        <Route path='/signup' element={AuthUser ? <Navigate to={"/todo"}/>:<Signup/>}/>
        <Route path='/login' element={AuthUser ?<Navigate to={"/todo"}/>:<Login/>}/>
        <Route path='/todo' element={AuthUser ? <ToDoPage/> : <Navigate to={"/signup"}/>}/>
        
      </Routes>
    </div>
  )
}

export default App
