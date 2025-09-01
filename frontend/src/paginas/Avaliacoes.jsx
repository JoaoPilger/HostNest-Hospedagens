import { useState, useEffect } from 'react';
import avaliacoesData from './data/avaliacoes.json';
import '../styles/avaliacoes.css';

export default function Avaliacoes({ casaId, casaTitulo }) {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [novaAvaliacao, setNovaAvaliacao] = useState({
    nome: '',
    nota: 5,
    comentario: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Buscar avaliações da casa específica
    const casaAvaliacoes = avaliacoesData.find(casa => casa.casaId === casaId);
    if (casaAvaliacoes) {
      setAvaliacoes(casaAvaliacoes.avaliacoes);
    }
  }, [casaId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaAvaliacao(prev => ({
      ...prev,
      [name]: name === 'nota' ? Number(value) : value
    }));
    
    // Limpar erro do campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!novaAvaliacao.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }
    
    if (!novaAvaliacao.comentario.trim()) {
      newErrors.comentario = 'Comentário é obrigatório';
    } else if (novaAvaliacao.comentario.trim().length < 10) {
      newErrors.comentario = 'Comentário deve ter pelo menos 10 caracteres';
    }
    
    if (novaAvaliacao.nota < 1 || novaAvaliacao.nota > 5) {
      newErrors.nota = 'Nota deve ser entre 1 e 5';
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

    // Criar nova avaliação
    const novaAvaliacaoCompleta = {
      id: Date.now(), // ID único baseado no timestamp
      nome: novaAvaliacao.nome.trim(),
      data: new Date().toISOString().split('T')[0], // Data atual
      nota: novaAvaliacao.nota,
      comentario: novaAvaliacao.comentario.trim()
    };

    // Adicionar à lista de avaliações
    setAvaliacoes(prev => [...prev, novaAvaliacaoCompleta]);

    // Limpar formulário
    setNovaAvaliacao({
      nome: '',
      nota: 5,
      comentario: ''
    });
    
    setErrors({});
    setShowForm(false);
  };

  const calcularMediaNotas = () => {
    if (avaliacoes.length === 0) return 0;
    const soma = avaliacoes.reduce((acc, aval) => acc + aval.nota, 0);
    return (soma / avaliacoes.length).toFixed(1);
  };

  const renderizarEstrelas = (nota) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`estrela ${i < nota ? 'preenchida' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="avaliacoes-container">
      <div className="avaliacoes-header">
        <h3>Avaliações dos Hóspedes</h3>
        <div className="avaliacoes-stats">
          <div className="media-notas">
            <span className="nota-media">{calcularMediaNotas()}</span>
            <div className="estrelas-media">
              {renderizarEstrelas(Math.round(calcularMediaNotas()))}
            </div>
            <span className="total-avaliacoes">
              {avaliacoes.length} avaliação{avaliacoes.length !== 1 ? 'ões' : ''}
            </span>
          </div>
          <button 
            className="btn-nova-avaliacao"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancelar' : 'Escrever Avaliação'}
          </button>
        </div>
      </div>

      {/* Formulário para nova avaliação */}
      {showForm && (
        <div className="form-avaliacao">
          <h4>Escreva sua avaliação para "{casaTitulo}"</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nome">Seu nome:</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={novaAvaliacao.nome}
                onChange={handleInputChange}
                placeholder="Digite seu nome"
                className={errors.nome ? 'error' : ''}
              />
              {errors.nome && <span className="error-message">{errors.nome}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="nota">Sua nota:</label>
              <select
                id="nota"
                name="nota"
                value={novaAvaliacao.nota}
                onChange={handleInputChange}
                className={errors.nota ? 'error' : ''}
              >
                <option value={5}>5 - Excelente</option>
                <option value={4}>4 - Muito bom</option>
                <option value={3}>3 - Bom</option>
                <option value={2}>2 - Regular</option>
                <option value={1}>1 - Ruim</option>
              </select>
              {errors.nota && <span className="error-message">{errors.nota}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="comentario">Seu comentário:</label>
              <textarea
                id="comentario"
                name="comentario"
                value={novaAvaliacao.comentario}
                onChange={handleInputChange}
                placeholder="Conte sua experiência com esta acomodação..."
                rows="4"
                className={errors.comentario ? 'error' : ''}
              />
              {errors.comentario && <span className="error-message">{errors.comentario}</span>}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Enviar Avaliação
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de avaliações */}
      <div className="lista-avaliacoes">
        {avaliacoes.length === 0 ? (
          <p className="sem-avaliacoes">
            Seja o primeiro a avaliar esta acomodação!
          </p>
        ) : (
          avaliacoes.map((avaliacao) => (
            <div key={avaliacao.id} className="avaliacao-item">
              <div className="avaliacao-header">
                <div className="avaliacao-info">
                  <h4 className="nome-avaliador">{avaliacao.nome}</h4>
                  <span className="data-avaliacao">
                    {new Date(avaliacao.data).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="nota-avaliacao">
                  {renderizarEstrelas(avaliacao.nota)}
                </div>
              </div>
              <p className="comentario-avaliacao">{avaliacao.comentario}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
