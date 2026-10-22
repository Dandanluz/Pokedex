import {useState} from 'react';
import ReadCards from './ReadCards';
import Detalhes from './Detalhes';
import Pesquisa from './Pesquisa';

function Cards() {
  const { pokemonData, loading } = ReadCards();
  const [inputNome, setInputNome] = useState('');
  const [termoBusca, setTermoBusca] = useState('');
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  const handleBuscar = () => {
    setTermoBusca(inputNome);
    setSelectedPokemonId(null);
  };

  const handleSelectCard = (id) => {
    setSelectedPokemonId(id);
    setTermoBusca('');
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
        onChange={(e) => setInputNome(e.target.value)}
      />
      <button id="botao-buscar" onClick={handleBuscar} >Buscar</button>

      <div>
            <ul className="filtros">
                <li >
                    <select>
                      <option value = "" disabled selected>Type</option>
                      <option value = "Fogo"> Fogo</option>
                      <option value = "Água"> Água</option>
                      <option value = "Terra"> Terra</option>

                    </select>
                </li>
                <li >
                    Email
                </li>
                <li >
                    Idade
                </li>
                <li >
                    Salario
                </li>
                <li >
                    Deletar
                </li>
                <li >
                    Editar
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