import { useState } from 'react';
import ReadCards from './ReadCards';
import Detalhes from './Detalhes';
import Pesquisa from './Pesquisa';

function Cards() {
  const { pokemonData, loading } = ReadCards();
  const [inputNome, setInputNome] = useState('');
  const [termoBusca, setTermoBusca] = useState('');
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroAlturaMin, setFiltroAlturaMin] = useState('');
  const [filtroAlturaMax, setFiltroAlturaMax] = useState('');

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

  const handleBuscar = () => {
    setTermoBusca(inputNome);
    setSelectedPokemonId(null);
  };

  const handleSelectCard = (id) => {
    setSelectedPokemonId(id);
    setTermoBusca('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleBuscar(); 
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const pokemonsFiltrados = pokemonData.filter((pokemon) => {
    const passaTipo = filtroTipo === '' || pokemon.types.some((t) => t.type.name.toLowerCase() === filtroTipo.toLowerCase());

    let passaAlturaMin = true;
    let passaAlturaMax = true;

    const alturaCmMin = pokemon.height * 10;
    const alturaCmMax = pokemon.height * 10;


    if (filtroAlturaMin === 'Sem Mínimo') {
      passaAlturaMin = alturaCmMin >= 0;
    } else if (filtroAlturaMin === '50 cm') {
      passaAlturaMin = alturaCmMin >= 50;
    } else if (filtroAlturaMin === '1 m') {
      passaAlturaMin = alturaCmMin >= 100;
    } else if (filtroAlturaMin === '1,5 m') {
      passaAlturaMin = alturaCmMin >= 150;
    }

    if (filtroAlturaMax === 'Sem Máximo') {
      passaAlturaMax = alturaCmMax;
    } else if (filtroAlturaMax === '50 cm') {
      passaAlturaMax = alturaCmMax <= 50;
    } else if (filtroAlturaMax === '1 m') {
      passaAlturaMax = alturaCmMax <= 100;
    } else if (filtroAlturaMax === '1,5 m') {
      passaAlturaMax = alturaCmMax <= 150;
    }

    return passaTipo && passaAlturaMin && passaAlturaMax;
  });
  
  return (
    <div>
      <div className='search-wrapper'>
        <input
          id="busca"
          type="text"
          placeholder="Nome do Pokémon"
          value={inputNome}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputNome(e.target.value)}
        />
        <button id="botao-buscar" onClick={handleBuscar}>Buscar</button>
      </div>

      <div>
            <ul className="filtros">
                <li>
                    <select className='tipos' value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
                      <option value="">Todos os Tipos</option>
                      <option value="fire">Fogo</option>
                      <option value="water">Água</option>
                      <option value="ground">Terra</option>
                      <option value="grass">Grama</option>
                      <option value="poison">Veneno</option>
                      <option value="flying">Voador</option>
                      <option value="bug">Inseto</option>
                      <option value="normal">Normal</option>
                      <option value="electric">Eletrico</option>
                      <option value="fairy">Fada</option>
                      <option value="fighting">Luta</option>
                      <option value="psychic">Psíquico</option>
                      <option value="rock">Pedra</option>
                      <option value="steel">Metal</option>
                      <option value="ghost">Fantasma</option>
                      <option value="ice">Gelo</option>
                      <option value="dragon">Dragão</option>
                    </select>
                </li>
               <li>
                    <select className='AlturaMin' value={filtroAlturaMin} onChange={(e) => setFiltroAlturaMin(e.target.value)}>
                      <option value="Sem Mínimo">Altura min.</option>
                      <option value="50 cm">50 cm</option>
                      <option value="1 m">1 m</option>
                      <option value="1,5 m">1,5 m</option>
                    </select>
               </li>
               <li>
                    <select className='AlturaMax' value={filtroAlturaMax} onChange={(e) => setFiltroAlturaMax(e.target.value)}>
                      <option value="Sem Máximo">Altura max.</option>
                      <option value="50 cm">50 cm</option>
                      <option value="1 m">1 m</option>
                      <option value="1,5 m">1,5 m</option>
                    </select>
               </li>
            </ul>
      </div>
      <div className='container'>
        <div className='posts-container'>
          {pokemonsFiltrados.length > 0 ? (
            pokemonsFiltrados.map((pokemon) => (
              <div
                key={pokemon.id}
                onClick={() => handleSelectCard(pokemon.id)}
                className='pokemon-card'
              >
                <img src={pokemon.img} alt={pokemon.name} />
                <p>ID: {pokemon.id}</p>
                <h2>{pokemon.name}</h2>
                <div className="pokemon-types">
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
              </div>
            ))
          ) : (
            <p>Nenhum Pokémon encontrado com esses filtros.</p>
          )}
        </div>

        {/* O painel de detalhes fica aqui dentro, esticando na lateral */}
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