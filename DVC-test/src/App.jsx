import { useState } from 'react'
import RootRoters from './routes';
import Header from './components/Header/Header';
import './App.scss'

function App() {

  return (
    <>
      <Header />
      <RootRoters />
    </>
  )
}

export default App
