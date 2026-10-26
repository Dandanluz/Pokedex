import { useState, useEffect, useContext } from 'react';
import { FavoritosContext } from './FavoritosContext'; 

function Capturar({ pokemon, onConcluido }) {
    const { alternarFavorito } = useContext(FavoritosContext); 
    const [corDoBotao, setCorDoBotao] = useState('red');
    const [milissegundos, setMilissegundos] = useState(0);
    const [tentativasSucesso, setTentativasSucesso] = useState(0); 
    const [mensagem, setMensagem] = useState('Espera ficar verde e clica em menos de 1s!');

    useEffect(() => {
        if (corDoBotao === 'red') {
            const timer = setTimeout(() => {
                setCorDoBotao('green');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [corDoBotao]);

    useEffect(() => {
        let interval = null;
        
        if (corDoBotao === 'green') {
            interval = setInterval(() => {
                setMilissegundos((prev) => prev + 10);
            }, 10);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [corDoBotao]);

    const tentarCapturar = () => {
        if (corDoBotao === 'red') {
            setMensagem('Muito cedo! O botão ainda estava vermelho.');
            return;
        }

        if (milissegundos < 1000) {
            const proximoSucesso = tentativasSucesso + 1;
            setTentativasSucesso(proximoSucesso);

            if (proximoSucesso >= 5) {
                alternarFavorito(pokemon);
                setMensagem('Parabéns! Capturado com sucesso!');
                if (onConcluido) onConcluido(); 
            } else {
                setMensagem(`Boa! (${proximoSucesso}/5). Tenta outra vez!`);
                reiniciarRodada();
            }
        } else {
            setMensagem('Muito lento (> 1s)! As tentativas foram resetadas.');
            setTentativasSucesso(0); 
            reiniciarRodada();
        }
    };

    const reiniciarRodada = () => {
        setMilissegundos(0);
        setCorDoBotao('red');
    };

    return (
        <div className='Captura'>
            <h3>Minijogo de Captura: {pokemon.name}</h3>
            <p>Progresso: <strong>{tentativasSucesso} / 5</strong></p>
            <p>{mensagem}</p>
            <h3>Tempo: {milissegundos}ms</h3>
            
            <button 
                onClick={tentarCapturar}
                style={{ backgroundColor: corDoBotao, color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
            >
                {corDoBotao === 'red' ? 'Esperando...' : 'CLIQUE JÁ!'}
            </button>
        </div>
    );
}

export default Capturar;