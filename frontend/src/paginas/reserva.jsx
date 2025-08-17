import React, { useState, useEffect, useMemo } from "react";
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
        } else if (!registroData.dataFim){
            newErrors.dataFim = 'Check-out é obrigatório';
        } else if(new Date(registroData.dataFim) <= new Date(registroData.dataIni)){
            newErrors.dataFim = 'Check-out deve ser depois do Check-in';
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

    const total = useMemo(() => {
        const base = casa.preco * quantasNoites(registroData.dataIni, registroData.dataFim);
        const extra = base*((registroData.hospedes-1)*0.05);
        return base + extra
    }, [registroData, casa])

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
                    {errors.dataIni && <span className="error-message">{errors.da}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="fim">Até
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
                            className={errors.hospedes ? 'error' : ''}
                        />
                    </label>
                    {errors.hospedes && <span className="error-message">{errors.hospedes}</span>}
                </div>
                <div className="total">
                    Total {total.toLocaleString('pt-br', { style:'currency', currency:'BRL' })}
                    </div>
                <button type="submit" className="submit-button"> Fazer Reserva </button>
            </form>
        </div>
    )
}