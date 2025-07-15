import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./paginas/home";
import Cadastro from "./paginas/cadastro";
import Casa from "./paginas/casas";
import Login from "./paginas/login";
import LogOut from "./paginas/LogOut";
import './styles/App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cadastro/user" element={<Cadastro/>} />
        <Route path="/cadastro/casa" element={<Cadastro/>} />
        <Route path="/casa:id" element={<Casa/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<LogOut/>} />
      </Routes>
    </Router>
  )
}

export default App
