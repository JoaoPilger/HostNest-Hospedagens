import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import casas from './data/casas.json';
import "../styles/cadastro.css";

export default function Reserva(){
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
            [name]: value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    useEffect(() => {
        const encontrada = casas.find(c => c.id === id);
        setCasa(encontrada);
    }, [id]);

    if (!casa) return <p>Casa não encontrada.</p>;

    function quantasNoites(inicio, fim) {
        if (!inicio || !fim) return 1;
        const inicioData = new Date(inicio);
        const fimData = new Date(fim);
        const diferenca = Math.ceil((fimData - inicioData) / (1000 * 60 * 60 * 24)); // Pelo que vi o Date tranforma em milissegundos, então (1000 * 60 * 60 * 24) transforma em dias
        return diferenca > 0 ? diferenca : 1;
    }

    const validateForm = () => {
        const newErrors = {};

        if (!registroData.dataIni.trim()) {
            newErrors.dataIni = 'Check-in é obrigatório';
        }
        if (!registroData.dataFim.trim()){
            newErrors.dataFim = 'Check-out é obrigatório';
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

        // os comentários abaixo tem que mudar depois

        // const response = await fetch('http://localhost:4000/login',{    
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(registroData),
        //     credentials: "include"
        // })

        //     const data = await response.json();

        // if (response.ok) {
        //     const sessionResp = await fetch("http://localhost:4000/", {
        //         method: 'GET',
        //         credentials: 'include'
        //     })
            
        //     navigate('/');
        // }else{
        //     console.error('Erro no login:', data.error);
        // }
    };

    const base = casa.preco * quantasNoites(registroData.dataIni, registroData.dataFim);
    const extra = base*((registroData.hospedes-1)*0.05);

    return(
        <div className="cadastro-box">
            <h2>Reserva da casa {casa.titulo}</h2>
            <form onSubmit={handleSubmit} className="cadastroForm">
                <div className="form-group">
                    <label htmlFor="inicio">De:
                        <input 
                            type="date"
                            id="checkIn"
                            name="dataIni"
                            value={registroData.dataIni} 
                            onChange={handleChange}
                            className={errors.dataIni ? 'error' : ''}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="fim">
                        <input 
                            type="date"
                            id="checkOut"
                            name="dataFim"
                            value={registroData.dataFim}
                            onChange={handleChange}
                            className={errors.dataFim ? 'error' : ''}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="hospedes">
                        <select value={registroData.hospedes} onChange={handleChange} id="hospedes" name="hospedes" className={errors.hospedes ? 'error' : ''}>
                            {[1, 2, 3, 4, 5, 6].map((h) => (
                                <option key={h} value={h}>{h}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="total">
                    {/* tentei fazer algo assim, se for um hóspede paga normal, se tiver mais de 1 paga 5% a mais por hóspede extra */}
                    Total R$ {base + extra}
                    </div>
                <button type="submit" className="submit-button"> Fazer Reserva </button>
            </form>
        </div>
    )
}