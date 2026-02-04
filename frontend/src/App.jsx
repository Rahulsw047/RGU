import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyNavbar from '../components/MyNavbar'
import Dashboard from '../components/Dashboard'
import WorkEntry from '../components/WorkEntry'
import EmployeeManagement from '../components/EmplyoeeManagement';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <div>
      <MyNavbar/>

      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/work-entry" element={<WorkEntry/>}/>
        <Route path="/employees" element={<EmployeeManagement/>}/>
        <Route path="/items" element={<Dashboard/>}/>
        <Route path="/reports" element={<Dashboard/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
