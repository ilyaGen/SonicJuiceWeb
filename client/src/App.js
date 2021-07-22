import 'materialize-css'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'

import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { Loader } from './components/Loader'


import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'


function App() {

  const { login, logout, token, userID, isReady } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!isReady) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={
      { login, logout, token, userID, isAuthenticated }
    }>
        <Router>
          <NavBar />
            <div className='main'>
              { routes }
            </div>
          <Footer />
        </Router>
      
    </AuthContext.Provider>

    
  )
}

export default App
