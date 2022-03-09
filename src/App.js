import React from 'react'
import Nav from './nav'
import Panel from './panel.jsx'
import Wallet from './Wallet.jsx'

const App = () => {
  return (
    <div className='flex w-screen h-screen'>
        <Nav/>
        <div className='flex w-full'>
            <Panel />
            <Wallet/>
        </div>
    </div>
  )
}

export default App