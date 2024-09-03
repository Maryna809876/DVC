import { useState } from 'react'
import RootRoters from './routes';
import Header from './components/Header/Header';
import './App.scss'
import Modal from './components/Modal/Modal';

function App() {

  return (
    <>
      <Header />
      <RootRoters />
    </>
  )
}

export default App
