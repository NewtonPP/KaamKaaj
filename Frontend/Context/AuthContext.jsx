import React, { createContext, useState } from 'react'

export const AuthDataContext = createContext()
const AuthContext = ({children}) => {

    const [AuthUser, setAuthUser] = useState(localStorage.getItem("ToDoUser")) 

  return (
    <AuthDataContext.Provider value={{AuthUser, setAuthUser}}>
        {children}
    </AuthDataContext.Provider>
  )
}

export default AuthContext
