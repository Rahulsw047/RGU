import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyNavbar from '../components/MyNavbar'
import Dashboard from '../components/Dashboard'
import WorkEntry from '../components/WorkEntry'
import EmployeeManagement from '../components/EmplyoeeManagement';
import ItemManagement from '../components/ItemManagement';
import SummaryReport from '../components/SummaryReport';
import DetailedReport from '../components/DetailedReport';
import Login from '../components/Login';
import ProtectedRoute from '../components/ProtectedRoute';

function App() {
  const [count, setCount] = useState(0)
  const isAuthenticated=()=>{
    return localStorage.getItem('token')!==null;
  };


  return (
    <Router>
    <div>
      <MyNavbar/>

      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path="/work-entry" element={<ProtectedRoute><WorkEntry/></ProtectedRoute>}/>
        <Route path="/employees" element={<ProtectedRoute><EmployeeManagement/></ProtectedRoute>}/>
        <Route path="/items" element={<ProtectedRoute><ItemManagement/></ProtectedRoute>}/>
        <Route path="/detailed-report" element={<ProtectedRoute><DetailedReport/></ProtectedRoute>}/>
        <Route path="/" element={<Navigate to="/dashboard"/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
