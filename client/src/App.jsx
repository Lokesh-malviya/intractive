import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './component/login/index.jsx'
import HomePage from './component/homepage/homepage'
import Start from  './component/start/starts.jsx';
import Admin from './component/admin/index.jsx';
import Apps from './component/homepage/App';
import Stage1 from './component/homepage/stage1'
import levelFactory from './lib/levels-factory';
import Navbar from './component/navbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route,Routes,Navigate } from 'react-router-dom'

function App() {
 const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={isAuth ?  <HomePage/>: <Navigate to="/"/>}/>
        <Route path="/home/round"  element={<MuiThemeProvider><Navbar startTimer={1}/><Stage1/>{/* <Apps level={levelFactory(4 ** 2)} /> */}</MuiThemeProvider> } />
      </Routes>
      </BrowserRouter>

      
    </div>
  )
}

export default App
