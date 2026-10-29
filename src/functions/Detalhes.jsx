import { useContext, useState } from 'react';
import { FavoritosContext } from './FavoritosContext';
import ReadCards from "./ReadCards";
import Capturar from './Capturar';
import pokebola from './pokebola.png'

function Detalhes({ id }) {
    const { pokemonData, loading } = ReadCards();
    
    const { favoritos, alternarFavorito } = useContext(FavoritosContext);
    const [pokemonAtivoMinigame, setPokemonAtivoMinigame] = useState(null);

    const coresTipos = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
    normal: '#A8A878',
  };
    

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
                <img className="fav-img" src={pokemon.img} alt={pokemon.name}/>
                <div className='infos'>
                    <p style={{fontSize: '12px', marginTop: '10px', }}>ID: {pokemon.id}</p>
                    <h2>{pokemon.name}</h2>
                    <div className="fav-types">
                    {pokemon.types?.map((t) => {
                        const nomeTipo = t.type.name;
                        return (
                        <span
                            key={nomeTipo}
                            style={{
                            backgroundColor: coresTipos[nomeTipo] || '#777',
                            color: 'black',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            marginRight: '4px',
                            fontSize: '0.85rem',
                            textTransform: 'capitalize',
                            fontWeight: 'bold'
                            }}
                        >
                            {nomeTipo}
                        </span>
                        );
                    })}
                    </div>
                    <br></br>
                    <p>Altura: {renderizarAltura(pokemon.height)}</p>
                    <p>Peso: {renderizarPeso(pokemon.weight)}</p>
                </div>
                <button className="pokebola" onClick={() => setPokemonAtivoMinigame(pokemon)}>
                    <img src={pokebola} alt="Botão pokebola" width={70} height={70}/>
                </button>
            </div>
        </div>
    );
}

export default Detalhes;