import {useState} from 'react';
import ReadCards from './ReadCards';
import Detalhes from './Detalhes';

function Cards() {
  const { pokemonData, loading } = ReadCards();
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='container'>
      <div className='posts-container'>
            {pokemonData?.map((pokemon) => (
                <div
                  key={pokemon.id}
                  onClick={() => setSelectedPokemonId(pokemon.id)} 
                  className='pokemon-card'>
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.img} alt={pokemon.name} />
                    <p>{pokemon.types?.map((type) => type.type.name).join(', ')}</p>
                </div>
            ))}
      </div>
      <aside className='detalhes'>
        {selectedPokemonId ? (
          <Detalhes id={selectedPokemonId} />
        ) : (
          <p>Selecione um Pokémon para ver os detalhes.</p>
        )}
      </aside>
    </div>
  );
}

export default Cards;