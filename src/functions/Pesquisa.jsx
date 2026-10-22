import ReadCards from "./ReadCards";
import Detalhes from "./Detalhes";

function Pesquisa({nome}) {
    const { pokemonData, loading } = ReadCards();
    if (loading) {
        return <p>Loading...</p>;
    }

    if (!nome){
        return<p></p>
    }

    const pokemon = pokemonData.find((pokemon) => pokemon.name.toLowerCase() === nome.toLowerCase());

    try {
        if(!pokemon){
            return <p>Pokemon não encontrado</p>
        }
        else{
            return <Detalhes id={pokemon.id} />;
        }
    } catch (erro) {
        return <p>Erro ao buscar Pokémon: {erro.message}</p>;
    }
}

export default Pesquisa;