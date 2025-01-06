import React from 'react'
import Signup from './pages/Signup'
import {Routes, Route} from "react-router-dom"
import Login from './pages/Login'
import ToDoPage from './pages/ToDoPage'

const App = () => {
  return (
    <div className='h-screen '>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/todo' element={<ToDoPage/>}/>
        
      </Routes>
    </div>
  )
}

export default App
