import { useContext } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Login } from './pages/auth/login'
import { Register } from './pages/auth/register'
import Master from './pages/layout/master'
import { Task } from './pages/task'
import AuthContext from './store/auth/auth.context-provider'

function App() {
  const { authState } = useContext(AuthContext)
  const location = useLocation()

  return (
    <Master authState={authState}>
      <Routes>
        <Route
          path='/'
          element={
            <Navigate
              to={authState.isLoggedIn ? location.pathname : '/auth/login'}
            />
          }
        />
        {!authState.isLoggedIn && (
          <Route path='auth'>
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
          </Route>
        )}
        {authState.isLoggedIn && <Route path='tasks' element={<Task />} />}
      </Routes>
    </Master>
  )
}

export default App
