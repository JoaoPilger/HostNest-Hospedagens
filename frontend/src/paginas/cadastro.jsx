import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/cadastro.css';

export default function Cadastro() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
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

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.nome.trim()) {
            newErrors.nome = 'Nome é obrigatório';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!formData.senha) {
            newErrors.senha = 'Senha é obrigatória';
        } else if (formData.senha.length < 8) {
            newErrors.senha = 'A senha deve ter pelo menos 8 caracteres';
        }

        if (formData.senha !== formData.confirmarSenha) {
            newErrors.confirmarSenha = 'As senhas não coincidem';
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

        const response = await fetch('http://localhost:4000/cadastro/user',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)

        })

        const data = await response.json();

        console.log('Dados do formulário:', formData);
        // Após o cadastro bem-sucedido, redirecione para a página inicial
        navigate('/');
    };

    return (
        <div className="cadastro-container">
            <div className="cadastro-box">
                <h2>Criar Conta</h2>
                <form onSubmit={handleSubmit} className="cadastro-form">
                    <div className="form-group">
                        <label htmlFor="nome">Nome Completo</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            className={errors.nome ? 'error' : ''}
                        />
                        {errors.nome && <span className="error-message">{errors.nome}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            className={errors.senha ? 'error' : ''}
                        />
                        {errors.senha && <span className="error-message">{errors.senha}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmarSenha">Confirmar Senha</label>
                        <input
                            type="password"
                            id="confirmarSenha"
                            name="confirmarSenha"
                            value={formData.confirmarSenha}
                            onChange={handleChange}
                            className={errors.confirmarSenha ? 'error' : ''}
                        />
                        {errors.confirmarSenha && <span className="error-message">{errors.confirmarSenha}</span>}
                    </div>

                    <button type="submit" className="submit-button"> Cadastrar </button>
                    <div className='cadastro'>
                        <p className='cadastre-se'>Já possui uma conta? </p>
                        <a href="/login">Faça Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
}