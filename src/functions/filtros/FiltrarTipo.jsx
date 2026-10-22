import ReadCards from "../ReadCards";

function FiltrarTipo(tipo){
  const { pokemonData, loading } = ReadCards();

  if (loading) {
    return <p>Loading...</p>;
  }

  if(pokemonData.types === tipo){
    return 
  }
}