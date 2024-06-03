import React from 'react';
import Forms from './Components/Forms.tsx';
import Qr_CODE from './Components/Qr_CODE.tsx';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App flex flex-col w-[100%]  justify-center items-center">
      <Routes>
        <Route path="/" element={<Forms />} />
        <Route path="/Qr_CODE" element={<Qr_CODE />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
