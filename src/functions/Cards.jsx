import {useState} from 'react';
import ReadCards from './ReadCards';
import Detalhes from './Detalhes';
import Pesquisa from './Pesquisa';

function Cards() {
  const { pokemonData, loading } = ReadCards();
  const [inputNome, setInputNome] = useState('');
  const [termoBusca, setTermoBusca] = useState('');
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  const handleSelectCard = (id) => {
    setSelectedPokemonId(id);
    setTermoBusca('');
  };

  const handleBuscar = () => {
    setTermoBusca(inputNome);
    setSelectedPokemonId(null);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleBuscar();
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  
  return (
    <div className='barra-pesquisa'>
      <input 
        id="busca" 
        type="text" 
        placeholder="Nome do Pokémon" 
        value={inputNome} 
        onKeyDown={handleKeyDown}
        onChange={(e) => setInputNome(e.target.value)}
      />
      <button id="botao-buscar" onClick={handleBuscar} >Buscar</button>

    <div>
            <ul className="filtros">
                <li>
                    <select defaultValue="">
                      <option value="" disabled>Type</option>
                      <option value="Fogo">Fogo</option>
                      <option value="Água">Água</option>
                      <option value="Terra">Terra</option>
                    </select>
                </li>
               <li>
                    <select defaultValue="">
                      <option value="" disabled>Altura min.</option>
                      <option value="< 50 cm">0 cm</option>
                      <option value="50 cm < 1m">50 cm</option>
                      <option value="1m < 1,5m">1 m</option>
                      <option value="1,5m <">1,5 m</option>
                    </select>
               </li>
               <li>
                    <select defaultValue="">
                      <option value="" disabled>Altura max.</option>
                      <option value="< 50 cm">50 cm</option>
                      <option value="50 cm < 1m">1 m</option>
                      <option value="1m < 1,5m">1,5 m</option>
                      <option value="1,5m <">Infinito</option>
                    </select>
               </li>
            </ul>
            
      </div>
      
      <div className='container'>
        <div className='posts-container'>
          {pokemonData?.map((pokemon) => (
            <div
              key={pokemon.id}
              onClick={() => handleSelectCard(pokemon.id)}
              className='pokemon-card'
            >
              <h2>{pokemon.name}</h2>
              <img src={pokemon.img} alt={pokemon.name} />
              <p>{pokemon.types?.map((t) => t.type.name).join(', ')}</p>
            </div>
          ))}
        </div>

        <aside className='detalhes'>
          {termoBusca ? (
            <Pesquisa nome={termoBusca} />
          ) : selectedPokemonId ? (
            <Detalhes id={selectedPokemonId} />
          ) : (
            <p>Selecione um Pokémon ou faça uma busca para ver os detalhes.</p>
          )}
        </aside>
      </div>
    </div>
  );
}

export default Cards;