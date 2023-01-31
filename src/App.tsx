import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as React from 'react';
import './App.css';
import Home from './pages/home';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} >
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
