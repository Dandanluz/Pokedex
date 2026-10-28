import { useContext, useState } from 'react';
import { FavoritosContext } from './FavoritosContext';
import ReadCards from "./ReadCards";
import Capturar from './Capturar';

function Detalhes({ id }) {
    const { pokemonData, loading } = ReadCards();
    
    const { favoritos, alternarFavorito } = useContext(FavoritosContext);
    const [pokemonAtivoMinigame, setPokemonAtivoMinigame] = useState(null);
    

    if (loading) {
        return <p>Loading...</p>;
    }

    const pokemon = pokemonData.find((pokemon) => pokemon.id === Number(id));
    const ehFavorito = favoritos.some((fav) => fav.id === pokemon.id);

    function renderizarAltura(altura){
        if(altura < 10){
            return `${altura * 10} cm`;
        }
        else{
            return `${altura / 10} m`;
        }
    }
    
    function renderizarPeso(peso){
        return `${peso / 10} kg`;
    }
    
    return(
        <div>            
            {pokemonAtivoMinigame && (
                <div className="modal-minigame">
                    <Capturar
                        pokemon={pokemonAtivoMinigame}
                        onConcluido={() => setPokemonAtivoMinigame(null)}
                    />
                    <button onClick={() => setPokemonAtivoMinigame(null)}>Cancelar</button>
                </div>
            )}

            <div>
                <img src={pokemon.img} alt={pokemon.name}/>
                <div className='infos'>
                    <h2>{pokemon.name}</h2>
                    <p style={{fontSize: '12px', margin: '15px' , marginTop: '-15px'}}>ID: {pokemon.id}</p>
                    <p>Tipo: {pokemon.types.map((typeInfo) => typeInfo.type.name).join(', ')}</p>
                    <p>Altura: {renderizarAltura(pokemon.height)}</p>
                    <p>Peso: {renderizarPeso(pokemon.weight)}</p>
                </div>
                <button onClick={() => setPokemonAtivoMinigame(pokemon)}>
                    Jogar para Capturar
                </button>
            </div>
        </div>
    );
}

export default Detalhes;