import { useContext } from 'react';
import { FavoritosContext } from './FavoritosContext';

function Favoritos() {
    const { favoritos, alternarFavorito } = useContext(FavoritosContext);

    if (favoritos.length === 0) {
        return <p>Ainda não tens nenhum Pokémon favoritado.</p>;
    }

    return (
        <div className="favoritos-section">
            <h2>Pokémons Favoritados ({favoritos.length})</h2>
            <div className="posts-container">
                {favoritos.map((pokemon) => (
                    <div key={pokemon.id} className="pokemon-card">
                        <h3>{pokemon.name}</h3>
                        <img src={pokemon.img} alt={pokemon.name} />
                        <button onClick={() => alternarFavorito(pokemon)}>
                            Remover
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Favoritos;