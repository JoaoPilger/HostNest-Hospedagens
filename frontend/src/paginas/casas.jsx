import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import casas from './data/casas.json';
import "../styles/casas.css";

export default function Casa() {
  const { id } = useParams();
  const [casa, setCasa] = useState(null);
  const [registroData, setRegistroData] = useState({
    hospedes: 1,
    dataIni: "",
    dataFim: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const encontrada = casas.find(c => c.id === Number(id));
    setCasa(encontrada);
  }, [id]);

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

  const quantasNoites = (inicio, fim) => {
    if (!inicio || !fim) return 1;
    const inicioData = new Date(inicio);
    const fimData = new Date(fim);
    const diferenca = Math.ceil((fimData - inicioData) / (1000 * 60 * 60 * 24));
    return diferenca > 0 ? diferenca : 1;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!registroData.dataIni) {
      newErrors.dataIni = 'Check-in é obrigatório';
    }
    if (!registroData.dataFim) {
      newErrors.dataFim = 'Check-out é obrigatório';
    } else if (new Date(registroData.dataFim) <= new Date(registroData.dataIni)) {
      newErrors.dataFim = 'Check-out deve ser depois do Check-in';
      newErrors.dataIni = 'Check-in deve ser antes do Check-out';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Reserva realizada com sucesso!");
  };

  if (!casa) return <p>Casa não encontrada.</p>;

  const periodo = quantasNoites(registroData.dataIni, registroData.dataFim);
  const precoFinal = casa.preco * periodo;

  return (
    <div className="casa-detalhe">
      <div className="casa-info">
        <h1>{casa.titulo}</h1>

        {/* Galeria de Imagens */}
        <div className="galeria-imagens">
          <img src={casa.imagens?.[0] || casa.imagem} alt="Imagem principal" />
          {casa.imagens?.slice(1, 5).map((img, i) => (
            <img key={i} src={img} alt={`Imagem ${i + 2}`} />
          ))}
        </div>

        <p>{casa.descricao}</p>

        {/* Detalhes do imóvel */}
        <div className="detalhes-casa">
          <h3>Detalhes do Imóvel</h3>
          <ul>
            <li><strong>Tipo:</strong> {casa.tipoImovel}</li>
            <li><strong>Endereço:</strong> {casa.endereco?.rua}, {casa.endereco?.numero} - {casa.endereco?.bairro}, {casa.endereco?.cidade}</li>
            <li><strong>Quartos:</strong> {casa.quartos}</li>
            <li><strong>Banheiros:</strong> {casa.banheiros}</li>
            <li><strong>Cômodos:</strong> {casa.comodos}</li>
            <li><strong>Garagem:</strong> {casa.vagasGaragem || 0}</li>
            <li><strong>Tamanho:</strong> {casa.tamanho} m²</li>
          </ul>
        </div>

        {/* Contato */}
        <div className="contato-casa">
          <h3>Contato do Anunciante</h3>
          <ul>
            <li><strong>Nome:</strong> {casa.contato?.nome}</li>
            <li><strong>Telefone:</strong> {casa.contato?.telefone || 'N/A'}</li>
            <li><strong>Email:</strong> {casa.contato?.email || 'N/A'}</li>
            <li><strong>WhatsApp:</strong> {casa.contato?.whatsapp || 'N/A'}</li>
          </ul>
        </div>
      </div>

      {/* Formulário abaixo dos cards */}
      <div className="cadastro-box">
        {!registroData.dataIni || !registroData.dataFim ? (
          <h3><strong>Adicione as datas para ver o preço</strong></h3>
        ) : registroData.dataIni >= registroData.dataFim ? (
          <h3><strong>Por favor, altere para datas válidas</strong></h3>
        ) : (
          <h3><strong>R$ {precoFinal.toFixed(2)}</strong> por {periodo} noites</h3>
        )}

        <form onSubmit={handleSubmit} className="cadastroForm">
          <div className="form-group">
            <label htmlFor="checkIn">
              Check-in:
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
            <label htmlFor="checkOut">
              Check-out:
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
              Número de hóspedes:
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

          <button type="submit" className="submit-button">Fazer Reserva</button>
        </form>
      </div>
    </div>
  );
}
