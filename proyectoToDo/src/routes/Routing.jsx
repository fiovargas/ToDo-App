import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from '../pages/Registro';
import Login from '../pages/IniSesion';
import Home from '../pages/Home';

function Routing() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<Register/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Home" element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}
export default Routing