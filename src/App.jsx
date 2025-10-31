import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignupForm from './components/Forms/SignUpForm'
import UserListing from './components/UserListing/Index'
import { useSelector } from 'react-redux'
 
import QrCodeScanner from './components/QrScanner'

function App() {
  const [showListing, setShowListing] = useState(false)
  const { user } = useSelector((state) => state.user);
  return (
    <>
    <h2>hello</h2>
      {/* <div className='bg-amber-950 h-screen w-screen'>
        <div className="flex flex-col justify-center items-center h-full gap-6">
          {showListing ? (
            <SignupForm setShowListing={setShowListing} />
          ) : (
            user && <UserListing setShowListing={setShowListing} />
          )}
          {!user && <SignupForm setShowListing={setShowListing} />}
        </div>
      </div> */}
   
      <QrCodeScanner/>


    </>

  )
}

export default App
