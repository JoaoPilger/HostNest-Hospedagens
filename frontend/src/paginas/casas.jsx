import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import casas from './data/casas.json';
import "../styles/casas.css" //Precisa melhorar a aparência

export default function Casa() {
  const { id } = useParams();
  const [casa, setCasa] = useState(null);
  const [registroData, setRegistroData] = useState({
    hospedes: 1,
    dataIni: "",
    dataFim: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistroData(prev => ({
      ...prev,
      [name]: name === "hospedes" ? Number(value) : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  useEffect(() => {
    const encontrada = casas.find(c => c.id === Number(id));
    setCasa(encontrada);
  }, [id]);

  function quantasNoites(inicio, fim) {
    if (!inicio || !fim) return 1;
    const inicioData = new Date(inicio);
    const fimData = new Date(fim);
    const diferenca = Math.ceil((fimData - inicioData) / (1000 * 60 * 60 * 24)); // Pelo que vi o Date tranforma em milissegundos, então (1000 * 60 * 60 * 24) transforma em dias
    return diferenca > 0 ? diferenca : 1;
  }

  const validateForm = () => {
    const newErrors = {};

    if (!registroData.dataIni) {
      newErrors.dataIni = 'Check-in é obrigatório';
    } if (!registroData.dataFim){
      newErrors.dataFim = 'Check-out é obrigatório';
    } else if(new Date(registroData.dataFim) <= new Date(registroData.dataIni)){
      newErrors.dataFim = 'Check-out deve ser depois do Check-in';
      newErrors.dataIni = 'Check-in deve ser antes do Check-out';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {  
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Precisa adicionar mais
  };

  if (!casa) return <p>Casa não encontrada.</p>;

  const periodo = quantasNoites(registroData.dataIni, registroData.dataFim);

  const precoFinal = casa.preco * periodo;

  return (
    <div className='casa-container'>
      <div className='imagens'>
        <img src={casa.imagem} alt={casa.titulo} />
      </div>
      <div className='casa-detalhes'>
        <h1>{casa.titulo}</h1>
        <p>{casa.descricao}</p>
      </div>
      <div className="cadastroBox">
        {(!registroData.dataIni || !registroData.dataFim) && <h3><strong>Adiciode as datas para ver o preço</strong></h3>}
        {registroData.dataIni >= registroData.dataFim && registroData.dataIni && registroData.dataFim && <h3><strong>Por favor, altere para datas válidas</strong></h3>}
        {registroData.dataIni && registroData.dataFim && registroData.dataIni < registroData.dataFim && <h3><strong>R$ {precoFinal.toFixed(2)}</strong> por {periodo} noites</h3>}
        <form onSubmit={handleSubmit} className="cadastroForm">
          <div className="form-group">
            <label htmlFor="inicio">Check-in
              <input 
                type="date"
                id="checkIn"
                name="dataIni"
                value={registroData.dataIni} 
                onChange={handleChange}
                className={errors.dataIni ? 'error' : ''}
              />
            </label>
            {errors.dataIni && <span className="error-message">{errors.dataIni}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="fim">Check-out
              <input 
                type="date"
                id="checkOut"
                name="dataFim"
                value={registroData.dataFim}
                onChange={handleChange}
                className={errors.dataFim ? 'error' : ''}
              />
            </label>
            {errors.dataFim && <span className="error-message">{errors.dataFim}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="hospedes">
              <input 
                type="number"
                id="hospedes"
                min={1}
                name="hospedes"
                value={registroData.hospedes}
                onChange={handleChange}
              />
            </label>
          </div>
          <button type="submit" className="submit-button"> Fazer Reserva </button>
        </form>
      </div>      
    </div>
  );
}