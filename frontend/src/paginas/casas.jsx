import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import casas from './data/casas.json';

export default function Casa() {
  const { id } = useParams();
  const [casa, setCasa] = useState(null);

  useEffect(() => {
    const encontrada = casas.find(c => c.id === id);
    setCasa(encontrada);
  }, [id]);
  
  if (!casa) return <p>Casa não encontrada.</p>;

  return (
    <div>
      <h1>{casa.titulo}</h1>
      <img src={casa.imagem} alt={casa.titulo} width="400" />
      <p>{casa.descricao}</p>
      <p><strong>Preço por noite:</strong> R$ {casa.preco}</p>      
      <p>Se quer reservar, clique <Link to={`/reserva/${house.id}`}>Aqui</Link>.</p>
    </div>
  );
}
