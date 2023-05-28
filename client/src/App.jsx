import { useContext, useState } from 'react'


import Calandy from './components/Calandy'
import SetTimezone from './components/SetTimezone'
import Time from './components/Time'
import { UserContext } from './context/userContext'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div className='flex flex-col h-screen w-full items-center '>
      <Calandy/>
      </div>
    </>
  )
}

export default App
