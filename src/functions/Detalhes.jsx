import ReadCards from "./ReadCards"

function Detalhes({id}) {
    const { pokemonData, loading } = ReadCards();
    const pokemon = pokemonData.find((pokemon) => pokemon.id === id);

    if (loading) {
        return <p>Loading...</p>;
    }
    
    return(
        <div>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.img} alt={pokemon.name}/>
            <p>Tipo: {pokemon.types.map((typeInfo) => typeInfo.type.name).join(', ')}</p>
            <p>Altura: {pokemon.height}</p>
            <p>Peso: {pokemon.weight}</p>
        </div>
    );

}

export default Detalhes;