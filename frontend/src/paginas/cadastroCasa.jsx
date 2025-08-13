import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/cadastroCasa.css';

export default function CadastroCasa() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        titulo: '',
        endereco: {
            cidade: '',
            bairro: '',
            rua: '',
            numero: ''
        },
        tipoImovel: '',
        comodos: '',
        quartos: '',
        banheiros: '',
        vagasGaragem: '',
        tamanho: '',
        descricao: '',
        preco: '',
        tipoPreco: 'mensal', // mensal ou diaria
        fotos: [],
        contato: {
            nome: '',
            telefone: '',
            email: '',
            whatsapp: ''
        }
    });
    const [errors, setErrors] = useState({});
    const [fotosPreview, setFotosPreview] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleFotoChange = (e) => {
        const files = Array.from(e.target.files);
        
        if (files.length < 4) {
            setErrors(prev => ({
                ...prev,
                fotos: 'É necessário pelo menos 4 imagens'
            }));
            return;
        }

        if (files.length > 10) {
            setErrors(prev => ({
                ...prev,
                fotos: 'Máximo de 10 imagens permitidas'
            }));
            return;
        }

        // Criar preview das imagens
        const previews = files.map(file => URL.createObjectURL(file));
        setFotosPreview(previews);
        
        setFormData(prev => ({
            ...prev,
            fotos: files
        }));

        setErrors(prev => ({
            ...prev,
            fotos: ''
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.titulo.trim()) {
            newErrors.titulo = 'Título é obrigatório';
        }

        if (!formData.endereco.cidade.trim()) {
            newErrors.cidade = 'Cidade é obrigatória';
        }

        if (!formData.endereco.bairro.trim()) {
            newErrors.bairro = 'Bairro é obrigatório';
        }

        if (!formData.endereco.rua.trim()) {
            newErrors.rua = 'Rua é obrigatória';
        }

        if (!formData.tipoImovel) {
            newErrors.tipoImovel = 'Tipo de imóvel é obrigatório';
        }

        if (!formData.comodos || formData.comodos < 1) {
            newErrors.comodos = 'Quantidade de cômodos é obrigatória';
        }

        if (!formData.quartos || formData.quartos < 0) {
            newErrors.quartos = 'Quantidade de quartos é obrigatória';
        }

        if (!formData.banheiros || formData.banheiros < 1) {
            newErrors.banheiros = 'Quantidade de banheiros é obrigatória';
        }

        if (!formData.tamanho || formData.tamanho < 1) {
            newErrors.tamanho = 'Tamanho é obrigatório';
        }

        if (!formData.descricao.trim()) {
            newErrors.descricao = 'Descrição é obrigatória';
        }

        if (!formData.preco || formData.preco < 1) {
            newErrors.preco = 'Preço é obrigatório';
        }

        if (formData.fotos.length < 4) {
            newErrors.fotos = 'É necessário pelo menos 4 imagens';
        }

        if (!formData.contato.nome.trim()) {
            newErrors.nomeContato = 'Nome do anunciante é obrigatório';
        }

        if (!formData.contato.telefone.trim() && !formData.contato.email.trim() && !formData.contato.whatsapp.trim()) {
            newErrors.contato = 'Pelo menos um meio de contato é obrigatório';
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

        try {
            // Criar FormData para enviar arquivos
            const formDataToSend = new FormData();
            
            // Adicionar dados do formulário
            formDataToSend.append('titulo', formData.titulo);
            formDataToSend.append('endereco', JSON.stringify(formData.endereco));
            formDataToSend.append('tipoImovel', formData.tipoImovel);
            formDataToSend.append('comodos', formData.comodos);
            formDataToSend.append('quartos', formData.quartos);
            formDataToSend.append('banheiros', formData.banheiros);
            formDataToSend.append('vagasGaragem', formData.vagasGaragem);
            formDataToSend.append('tamanho', formData.tamanho);
            formDataToSend.append('descricao', formData.descricao);
            formDataToSend.append('preco', formData.preco);
            formDataToSend.append('tipoPreco', formData.tipoPreco);
            formDataToSend.append('contato', JSON.stringify(formData.contato));

            // Adicionar fotos
            formData.fotos.forEach((foto, index) => {
                formDataToSend.append(`fotos`, foto);
            });

            const response = await fetch('http://localhost:4000/cadastro/casa', {
                method: 'POST',
                body: formDataToSend
            });

            if (response.ok) {
                alert('Casa cadastrada com sucesso!');
                navigate('/');
            } else {
                const errorData = await response.json();
                alert('Erro ao cadastrar casa: ' + errorData.message);
            }
        } catch (error) {
            console.error('Erro ao cadastrar casa:', error);
            alert('Erro ao cadastrar casa. Tente novamente.');
        }
    };

    return (
        <div className="cadastro-casa-container">
            <div className="cadastro-casa-box">
                <h2>Cadastrar Imóvel</h2>
                <form onSubmit={handleSubmit} className="cadastro-casa-form">
                    
                    {/* Informações Básicas */}
                    <div className="form-section">
                        <h3>Informações Básicas</h3>
                        
                        <div className="form-group">
                            <label htmlFor="titulo">Título do Anúncio *</label>
                            <input
                                type="text"
                                id="titulo"
                                name="titulo"
                                value={formData.titulo}
                                onChange={handleChange}
                                placeholder="Ex: Casa com 2 quartos no centro"
                                className={errors.titulo ? 'error' : ''}
                            />
                            {errors.titulo && <span className="error-message">{errors.titulo}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="cidade">Cidade *</label>
                                <input
                                    type="text"
                                    id="cidade"
                                    name="endereco.cidade"
                                    value={formData.endereco.cidade}
                                    onChange={handleChange}
                                    className={errors.cidade ? 'error' : ''}
                                />
                                {errors.cidade && <span className="error-message">{errors.cidade}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="bairro">Bairro *</label>
                                <input
                                    type="text"
                                    id="bairro"
                                    name="endereco.bairro"
                                    value={formData.endereco.bairro}
                                    onChange={handleChange}
                                    className={errors.bairro ? 'error' : ''}
                                />
                                {errors.bairro && <span className="error-message">{errors.bairro}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="rua">Rua *</label>
                                <input
                                    type="text"
                                    id="rua"
                                    name="endereco.rua"
                                    value={formData.endereco.rua}
                                    onChange={handleChange}
                                    className={errors.rua ? 'error' : ''}
                                />
                                {errors.rua && <span className="error-message">{errors.rua}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="numero">Número (opcional)</label>
                                <input
                                    type="text"
                                    id="numero"
                                    name="endereco.numero"
                                    value={formData.endereco.numero}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="tipoImovel">Tipo de Imóvel *</label>
                            <select
                                id="tipoImovel"
                                name="tipoImovel"
                                value={formData.tipoImovel}
                                onChange={handleChange}
                                className={errors.tipoImovel ? 'error' : ''}
                            >
                                <option value="">Selecione o tipo</option>
                                <option value="casa">Casa</option>
                                <option value="apartamento">Apartamento</option>
                                <option value="kitnet">Kitnet</option>
                                <option value="studio">Studio</option>
                                <option value="loft">Loft</option>
                                <option value="sobrado">Sobrado</option>
                                <option value="flat">Flat</option>
                            </select>
                            {errors.tipoImovel && <span className="error-message">{errors.tipoImovel}</span>}
                        </div>
                    </div>

                    {/* Características do Imóvel */}
                    <div className="form-section">
                        <h3>Características do Imóvel</h3>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="comodos">Cômodos *</label>
                                <input
                                    type="number"
                                    id="comodos"
                                    name="comodos"
                                    value={formData.comodos}
                                    onChange={handleChange}
                                    min="1"
                                    className={errors.comodos ? 'error' : ''}
                                />
                                {errors.comodos && <span className="error-message">{errors.comodos}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="quartos">Quartos *</label>
                                <input
                                    type="number"
                                    id="quartos"
                                    name="quartos"
                                    value={formData.quartos}
                                    onChange={handleChange}
                                    min="0"
                                    className={errors.quartos ? 'error' : ''}
                                />
                                {errors.quartos && <span className="error-message">{errors.quartos}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="banheiros">Banheiros *</label>
                                <input
                                    type="number"
                                    id="banheiros"
                                    name="banheiros"
                                    value={formData.banheiros}
                                    onChange={handleChange}
                                    min="1"
                                    className={errors.banheiros ? 'error' : ''}
                                />
                                {errors.banheiros && <span className="error-message">{errors.banheiros}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="vagasGaragem">Vagas de Garagem</label>
                                <input
                                    type="number"
                                    id="vagasGaragem"
                                    name="vagasGaragem"
                                    value={formData.vagasGaragem}
                                    onChange={handleChange}
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="tamanho">Tamanho (m²) *</label>
                                <input
                                    type="number"
                                    id="tamanho"
                                    name="tamanho"
                                    value={formData.tamanho}
                                    onChange={handleChange}
                                    min="1"
                                    className={errors.tamanho ? 'error' : ''}
                                />
                                {errors.tamanho && <span className="error-message">{errors.tamanho}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="descricao">Descrição *</label>
                            <textarea
                                id="descricao"
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Descreva as principais características do imóvel..."
                                className={errors.descricao ? 'error' : ''}
                            />
                            {errors.descricao && <span className="error-message">{errors.descricao}</span>}
                        </div>
                    </div>

                    {/* Preço */}
                    <div className="form-section">
                        <h3>Preço</h3>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="preco">Preço *</label>
                                <input
                                    type="number"
                                    id="preco"
                                    name="preco"
                                    value={formData.preco}
                                    onChange={handleChange}
                                    min="1"
                                    step="0.01"
                                    className={errors.preco ? 'error' : ''}
                                />
                                {errors.preco && <span className="error-message">{errors.preco}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="tipoPreco">Tipo de Preço</label>
                                <select
                                    id="tipoPreco"
                                    name="tipoPreco"
                                    value={formData.tipoPreco}
                                    onChange={handleChange}
                                >
                                    <option value="mensal">Mensal</option>
                                    <option value="diaria">Diária</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Fotos */}
                    <div className="form-section">
                        <h3>Fotos do Imóvel</h3>
                        
                        <div className="form-group">
                            <label htmlFor="fotos">Selecionar Fotos * (mínimo 4, máximo 10)</label>
                            <input
                                type="file"
                                id="fotos"
                                name="fotos"
                                multiple
                                accept="image/*"
                                onChange={handleFotoChange}
                                className={errors.fotos ? 'error' : ''}
                            />
                            {errors.fotos && <span className="error-message">{errors.fotos}</span>}
                        </div>

                        {fotosPreview.length > 0 && (
                            <div className="fotos-preview">
                                <h4>Preview das Imagens:</h4>
                                <div className="fotos-grid">
                                    {fotosPreview.map((preview, index) => (
                                        <div key={index} className="foto-preview">
                                            <img src={preview} alt={`Preview ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Informações de Contato */}
                    <div className="form-section">
                        <h3>Informações de Contato</h3>
                        
                        <div className="form-group">
                            <label htmlFor="nomeContato">Nome do Anunciante *</label>
                            <input
                                type="text"
                                id="nomeContato"
                                name="contato.nome"
                                value={formData.contato.nome}
                                onChange={handleChange}
                                className={errors.nomeContato ? 'error' : ''}
                            />
                            {errors.nomeContato && <span className="error-message">{errors.nomeContato}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="telefone">Telefone</label>
                                <input
                                    type="tel"
                                    id="telefone"
                                    name="contato.telefone"
                                    value={formData.contato.telefone}
                                    onChange={handleChange}
                                    placeholder="(11) 99999-9999"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="contato.email"
                                    value={formData.contato.email}
                                    onChange={handleChange}
                                    placeholder="seu@email.com"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="whatsapp">WhatsApp</label>
                            <input
                                type="tel"
                                id="whatsapp"
                                name="contato.whatsapp"
                                value={formData.contato.whatsapp}
                                onChange={handleChange}
                                placeholder="(11) 99999-9999"
                            />
                        </div>

                        {errors.contato && <span className="error-message">{errors.contato}</span>}
                    </div>

                    <button type="submit" className="submit-button">
                        Cadastrar Imóvel
                    </button>
                </form>
            </div>
        </div>
    );
} 