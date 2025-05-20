import '../styles/Home.css'

export default function Home(){
    return(
        <>
            <header>
                <img src="" alt="Nossa Logo" />
                <div className="direita">
                    <button id='acomodacao'>Coloque sua acomodação aqui</button>
                    <button id='login'>
                        <img src="" alt="Imagem Login " />
                        Entre ou Cadastre-se
                    </button>
                </div>
            </header>
            <section id="escolher">
                <h2>Escolha sua estadia</h2>
                <div className='linha'>
                    <button>
                        <img src="" alt="Imagem de Filtros " />
                        Filtros
                    </button>
                    <div className="barra-pesquisa">     
                        <div className="input-group">
                            <label htmlFor="local">Local</label>
                            <input type="text" id='local' />
                        </div>
                        <div className="input-group">
                            <label htmlFor="check-in">Check-in</label>
                            <input type="date" id="check-in" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="check-out">Check-out</label>
                            <input type="date" id="check-out" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="quantidade">Quantos hóspedes?</label>
                            <input type="number" min="1" id="quantidade" />
                        </div>
                    </div>
                    <button>Buscar</button>
                </div>
            </section>
            <section id="hospedagens">
                <h3>Hospedágens</h3>
                <div id="container-grid"></div>
            </section>
        </>
    )
}