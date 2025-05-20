import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/cadastro.css';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        senha: '',
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

        return newErrors;
    };

    const handleSubmit = async (e) => {  

        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const response = await fetch('http://localhost:4000/login',{    
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)

        })

            const data = await response.json();

        if (response.ok) {
            const token = data.token

            localStorage.setItem('token', token);
            
            navigate('/');
        }else{
            console.error('Erro no login:', data.error);
        }
    };

    return (
            <div className="cadastro-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="cadastro-form">
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
                    <button type="submit" className="submit-button"> Fazer Login </button>
                </form>
            </div>
    );
}