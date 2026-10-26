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
            const cm = altura * 10;
            return <p>{cm} cm</p>
        }
        else{
            const m = altura / 10;
            return <p>{m} m</p>
        }
    }
    
    function renderizarPeso(peso){
        const kg = peso / 10;
        return <p>{kg} kg</p>;
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
                <button onClick={() => setPokemonAtivoMinigame(pokemon)}>
                    Jogar para Capturar
                </button>
                <h2>{pokemon.name}</h2>
                <img src={pokemon.img} alt={pokemon.name}/>
                <p>Tipo: {pokemon.types.map((typeInfo) => typeInfo.type.name).join(', ')}</p>
                <p>Altura: {renderizarAltura(pokemon.height)}</p>
                <p>Peso: {renderizarPeso(pokemon.weight)}</p>
            </div>
        </div>
    );
}

export default Detalhes;