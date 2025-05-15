import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./paginas/home";
import Cadastro from "./paginas/cadastro";
import Casa from "./paginas/casas";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cadastro" element={<Cadastro/>} />
        <Route path="/casa:id" element={<Casa/>} />
      </Routes>
    </Router>
  )
}

export default App
