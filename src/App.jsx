import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from './components/nav'
import Home from './components/Home'
import Footer from './components/footer'
function App() {


  return (
    <>
    <Navbar/>
    <Home/>
    <Footer/>
    </>
  )
}

export default App
