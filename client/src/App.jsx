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
 const oneTime = async ()=>{
  const response = await fetch(`http://localhost:3001/users/${userId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const { round } = await response.json();
  setRo(round);
 }
 useEffect(() => {
  oneTime();

 }, [isAuth]);


  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={isAuth ?  <HomePage/>: <Navigate to="/"/>}/>
        <Route path="/home/round"  element={<MuiThemeProvider><Navbar startTimer={timeh}/><Stage1 rounds={ro}/>{/* <Apps level={levelFactory(4 ** 2)} /> */}</MuiThemeProvider> } />
        <Route path="/home/leader"  element={<Leader disables={true}/>} />
      </Routes>
      </BrowserRouter>

      
    </div>
  )
}

export default App
