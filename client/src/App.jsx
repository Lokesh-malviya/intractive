import { useState,useEffect } from 'react'
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
import Leader from './component/leaderboard'

function App() {
 const isAuth = Boolean(useSelector((state) => state.token));
 const userId = useSelector((state) => state.user);
 const token = useSelector((state) => state.token);
 const [ro,setRo] = useState(0);
 const timeh = useSelector((state) => state.timeh);




  return (
    <div className="App container">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={isAuth ?  <HomePage/>: <Navigate to="/"/>}/>
        <Route path="/home/round"  element={<MuiThemeProvider><Navbar/><Stage1/>{/* <Apps level={levelFactory(4 ** 2)} /> */}</MuiThemeProvider> } />
        <Route path="/home/leader"  element={<Leader disables={true}/>} />
      </Routes>
      </BrowserRouter>

      
    </div>
  )
}

export default App
