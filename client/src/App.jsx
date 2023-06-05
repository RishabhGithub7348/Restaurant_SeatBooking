import { useContext, useState } from 'react'
import { BrowserRouter ,Link, Route,Routes } from 'react-router-dom'

import Calandy from './components/Calandy'
import SetTimezone from './components/SetTimezone'
import Time from './components/Time'
import { UserContext } from './context/userContext'
import NavBar from './components/NavBar'
import Admin from './components/Admin'
import { Calendar } from 'antd'

function App() {
  const [count, setCount] = useState(0)
  const {isAuth} = useContext(UserContext)
  return (
    <>
    <BrowserRouter>
      <div className='flex flex-col h-screen w-full  '>
        <NavBar />
      
      <Routes>
       
        
          

            {
              isAuth ? (
                <>
                
                <Route path="/admin" element={<Admin />} />
                </>
              ) : (
                <Route path="/" element={<Calandy />} />
              )
            }
         
        
        
      </Routes>
      </div>
      </BrowserRouter>
    </>
  )
}

export default App
