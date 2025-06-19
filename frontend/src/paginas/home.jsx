export default function Home(){
    return(
        <>
            <header>
                <img src='' alt="Nossa Logo" />
                <div className="direita">
                    <a id='acomodacao' href=''>Coloque sua acomodação aqui</a>
                    <a id='login' href='\cadastro'>
                        <img src='' alt="Imagem Login " />
                        Entre ou Cadastre-se
                    </a>
                </div>
            </header>

            <section id="escolher">
                <h2>Escolha sua estadia</h2>
                <div className='linha'>
                    <div className="barra-pesquisa">
                        <div className="input-group">
                            <label htmlFor="local">Local</label>
                            <input type="text" id='local' placeholder='Onde você quer ficar?' />
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
                {/*Teste*/}
                <div id="container-flex">
                    <div className="item-flex">
                        <img src="" alt="Hospedagem Exemplo" className="hospedagem-img" />
                        <h4>Cavalo de Madeira</h4>
                        <p>R$ 200/noite</p>
                    </div>
                    <div className="item-flex">
                        <img src="" alt="Hospedagem Exemplo" className="hospedagem-img" />
                        <h4>Cavalo de Madeira</h4>
                        <p>R$ 200/noite</p>
                    </div>
                    <div className="item-flex">
                        <img src="" alt="Hospedagem Exemplo" className="hospedagem-img" />
                        <h4>Cavalo de Madeira</h4>
                        <p>R$ 200/noite</p>
                    </div>
                    <div className="item-flex">
                        <img src="" alt="Hospedagem Exemplo" className="hospedagem-img" />
                        <h4>Cavalo de Madeira</h4>
                        <p>R$ 200/noite</p>
                    </div>
                    <div className="item-flex">
                        <img src="" alt="Hospedagem Exemplo" className="hospedagem-img" />
                        <h4>Cavalo de Madeira</h4>
                        <p>R$ 200/noite</p>
                    </div>
                    <div className="item-flex">
                        <img src="" alt="Hospedagem Exemplo" className="hospedagem-img" />
                        <h4>Cavalo de Madeira</h4>
                        <p>R$ 200/noite</p>
                    </div>
                    <div className="item-flex">
                        <img src="" alt="Hospedagem Exemplo" className="hospedagem-img" />
                        <h4>Cavalo de Madeira</h4>
                        <p>R$ 200/noite</p>
                    </div>
                    <div className="item-flex">
                        <img src="" alt="Hospedagem Exemplo" className="hospedagem-img" />
                        <h4>Cavalo de Madeira</h4>
                        <p>R$ 200/noite</p>
                    </div>
                    <div className="item-flex">
                        <img src="" alt="Hospedagem Exemplo" className="hospedagem-img" />
                        <h4>Cavalo de Madeira</h4>
                        <p>R$ 200/noite</p>
                    </div>
                    <div className="item-flex">
                        <img src="" alt="Hospedagem Exemplo" className="hospedagem-img" />
                        <h4>Cavalo de Madeira</h4>
                        <p>R$ 200/noite</p>
                    </div>
                </div>
            </section>
        </>
    )
}