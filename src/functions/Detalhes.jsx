import { useContext } from 'react';
import { FavoritosContext } from './FavoritosContext';
import ReadCards from "./ReadCards";

function Detalhes({ id }) {
    const { pokemonData, loading } = ReadCards();
    
    const { favoritos, alternarFavorito } = useContext(FavoritosContext);

    if (loading) {
        return <p>Loading...</p>;
    }

    const pokemon = pokemonData.find((pokemon) => pokemon.id === id);
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
            <button 
                className="favoritar" 
                onClick={() => alternarFavorito(pokemon)}
            >
                {ehFavorito ? 'Remover dos Favoritos' : 'Favoritar'}
            </button>
            
            <h2>{pokemon.name}</h2>
            <img src={pokemon.img} alt={pokemon.name}/>
            <p>Tipo: {pokemon.types.map((typeInfo) => typeInfo.type.name).join(', ')}</p>
            <p>Altura: {renderizarAltura(pokemon.height)}</p>
            <p>Peso: {renderizarPeso(pokemon.weight)}</p>
        </div>
    );
}

export default Detalhes;