export default function Home(){
    return(
        <div className="home-container">
            {/* Header */}
            <header className="header">
                <div className="header-content">
                    <div className="logo-section">
                        <div className="logo-placeholder">
                            <span className="logo-text">HostNest</span>
                        </div>
                    </div>
                    <nav className="nav-menu">
                        <a href='/cadastro/casa' className="nav-link">
                            <svg className="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                            </svg>
                            Coloque sua acomodação
                        </a>
                        <a href='/cadastro/user' className="nav-link login-btn">
                            <svg className="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                            </svg>
                            Entrar / Cadastrar
                        </a>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Encontre o lugar perfeito para sua próxima aventura
                        </h1>
                        <p className="hero-subtitle">
                            Descubra acomodações únicas em destinos incríveis ao redor do mundo
                        </p>
                    </div>
                    
                    {/* Search Form */}
                    <div className="search-container">
                        <div className="search-form">
                            <div className="search-input-group">
                                <label htmlFor="local" className="search-label">
                                    <svg className="input-icon" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                                    </svg>
                                    Destino
                                </label>
                                <input 
                                    type="text" 
                                    id="local" 
                                    className="search-input"
                                    placeholder="Para onde você vai?" 
                                />
                            </div>
                            
                            <div className="search-input-group">
                                <label htmlFor="check-in" className="search-label">
                                    <svg className="input-icon" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                    </svg>
                                    Check-in
                                </label>
                                <input type="date" id="check-in" className="search-input" />
                            </div>
                            
                            <div className="search-input-group">
                                <label htmlFor="check-out" className="search-label">
                                    <svg className="input-icon" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                    </svg>
                                    Check-out
                                </label>
                                <input type="date" id="check-out" className="search-input" />
                            </div>
                            
                            <div className="search-input-group">
                                <label htmlFor="quantidade" className="search-label">
                                    <svg className="input-icon" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                                    </svg>
                                    Hóspedes
                                </label>
                                <input 
                                    type="number" 
                                    min="1" 
                                    id="quantidade" 
                                    className="search-input"
                                    placeholder="Quantos?" 
                                />
                            </div>
                            
                            <button className="search-button">
                                <svg className="button-icon" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                                </svg>
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Properties Section */}
            <section className="properties-section">
                <div className="properties-content">
                    <div className="section-header">
                        <h2 className="section-title">Hospedagens em Destaque</h2>
                        <p className="section-subtitle">Descubra lugares incríveis para sua próxima viagem</p>
                    </div>
                    
                    <div className="properties-grid">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                            <div key={index} className="property-card">
                                <div className="property-image">
                                    <div className="image-placeholder">
                                        <svg className="placeholder-icon" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <div className="property-badge">Destaque</div>
                                </div>
                                <div className="property-info">
                                    <h3 className="property-title">Casa na Montanha</h3>
                                    <p className="property-location">
                                        <svg className="location-icon" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                                        </svg>
                                        Serra da Mantiqueira, MG
                                    </p>
                                    <div className="property-features">
                                        <span className="feature">
                                            <svg className="feature-icon" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                            4 hóspedes
                                        </span>
                                        <span className="feature">
                                            <svg className="feature-icon" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                                            </svg>
                                            2 quartos
                                        </span>
                                        <span className="feature">
                                            <svg className="feature-icon" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                                            </svg>
                                            Wi-Fi
                                        </span>
                                    </div>
                                    <div className="property-price">
                                        <span className="price-amount">R$ 280</span>
                                        <span className="price-period">/ noite</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}