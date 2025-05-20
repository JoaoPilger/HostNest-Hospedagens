import '../styles/Home.css'

export default function Home(){
    return(
        <>
            <header>
                <img src="" alt="Nossa Logo" />
                <div className="direita">
                    <button>Coloque sua acomodação aqui</button>
                    <button>
                        <img src="" alt="Imagem Login" />
                        Entre ou Cadastre-se
                    </button>
                </div>
            </header>
            <section id="escolher">
                <h2>Escolha sua estadia</h2>
                <button>
                    <img src="" alt="Imagem de Filtros" />
                    Filtros
                </button>
                <div className="barra-pesquisa">
                    <div className="input-group">
                        <input type="text" placeholder="Qual é o local?" />
                    </div>
                    <div className="input-group">
                        <input type="date" placeholder="Check-in" />
                    </div>
                    <div className="input-group">
                        <input type="date" placeholder="Check-out" />
                    </div>
                    <div className="input-group">
                        <input type="number" min="1" placeholder="Quantos hóspedes?" />
                    </div>
                </div>
                <button>Buscar</button>
            </section>
            <section id="hospedagens">
                <h3>Hospedágens</h3>
                <div id="container-grid"></div>
            </section>
        </>
    )
}