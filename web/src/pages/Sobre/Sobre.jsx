import React from 'react';
import Header from '../../components/Header'
import Cachorro from '../../images/g&c/cachorro.jpg'
import Cachorro2 from '../../images/g&c/cachorro2.jpg'
import Cachorro3 from '../../images/g&c/cachorro3.jpg'
import Cachorro4 from '../../images/g&c/cachorro4.jpg'
import Gato from '../../images/g&c/gato.jpg'
import Gato2 from '../../images/g&c/gato2.jpg'
import Gato3 from '../../images/g&c/gato3.jpg'
import Gato4 from '../../images/g&c/gato4.jpg'
import './sobre.css'

const Sobre = () => {
    return (
        <>
            <Header titulo="Sobre"/>
            <div className="quem-somos">
                <h1>Quem somos nós?</h1>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Nunc id dui urna. 
                Morbi purus elit, ornare eu nisi et, volutpat ornare mauris. 
                Aliquam tempus turpis felis. In tristique consectetur rhoncus. 
                Curabitur posuere vitae risus et mollis. 
                Integer aliquam sed nulla eu aliquam. Aliquam erat volutpat. 
                Suspendisse potenti.

                Sed accumsan erat non est porttitor auctor. 
                Morbi consequat, risus condimentum volutpat pulvinar, sem nisi porta arcu, nec tincidunt augue eros ut tellus. 
                Cras molestie volutpat nisl ut tincidunt. Sed eget sagittis leo. 
                Duis id suscipit urna. Nunc posuere erat et urna fringilla pellentesque. 
                Fusce sed ornare purus. Aenean at augue vehicula, feugiat justo ut, ultrices tortor. 
                Nulla dignissim pellentesque ligula. 
                Suspendisse eu auctor ante. Nam pretium turpis sit amet nulla viverra, non ultrices nunc dignissim.
                </p>
            </div>
            <section className="atividades">
                <h1> Nossas Atividades</h1>
                <div className="container-atividades">
                    <div>
                        <img src={Cachorro}/>
                        <p>Vacinação de Cachorros</p>
                    </div>
                    <div>
                        <img src={Gato}/>
                        <p>Vacinação de Gatos</p>
                    </div>
                </div>
            </section>
            <section className="clientes">
                <h1></h1>
                <div className="container-clientes">
                    <div>
                        <img src={Cachorro4}></img>
                    </div>
                    <div>
                        <img src={Cachorro3}></img>
                    </div>
                    <div>
                        <img src={Cachorro2}></img>
                    </div>
                    <div>
                        <img src={Gato4}></img>
                    </div>
                    <div>
                        <img src={Gato3}></img>
                    </div>
                    <div>
                        <img src={Gato2}></img>
                    </div>
                </div>
            </section>

        </>
        
    );
};

export default Sobre;