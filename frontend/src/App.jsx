import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./paginas/home";
import Cadastro from "./paginas/cadastro";
import CadastroCasa from "./paginas/cadastroCasa";
import Casa from "./paginas/casas";
import Login from "./paginas/login";
import LogOut from "./paginas/LogOut";
import Reserva from "./paginas/reserva.jsx"
import './styles/App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cadastro/user" element={<Cadastro/>} />
        <Route path="/cadastro/casa" element={<CadastroCasa/>} />
        <Route path="/casa/:id" element={<Casa/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<LogOut/>} />
        <Route path="/reserva/:id" element={<Reserva/>} />
      </Routes>
    </Router>
  )
}

export default App
