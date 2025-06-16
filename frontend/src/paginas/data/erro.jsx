import React from 'react';
import '../../styles/erro.css';

const ErroMensagem = ({ mensagem, onFechar }) => {
  if (!mensagem) return null;

  return (
    <div className="erro-container">
      <p>{mensagem}</p>
      <button onClick={onFechar}>X</button>
    </div>
  );
};

export default ErroMensagem;