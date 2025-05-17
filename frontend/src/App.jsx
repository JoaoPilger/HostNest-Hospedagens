import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./paginas/Home.jsx";
import Cadastro from "./paginas/cadastro.jsx";
import Casa from "./paginas/casas.jsx";
import './App.css';

function App() {

  return (
      <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cadastro" element={<Cadastro/>} />
          <Route path="/casa:id" element={<Casa/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
