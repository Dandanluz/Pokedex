import { useState, useEffect } from 'react';

function ReadCards() {
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
      const [pokemonData, setPokemonData] = useState([]);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        fetch(url)
          .then((response) => response.json())
          .then(async (data) => {
            const pokemonDetails = await Promise.all(
              data.results.map(async (pokemon) => {
                const response = await fetch(pokemon.url);
                const details = await response.json();
                return {
                  id: details.id,
                  name: details.name,
                  img: details.sprites.front_default,
                  types: details.types,
                  height: details.height,
                  weight: details.weight,
                };
              })
            );
            setPokemonData(pokemonDetails);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
          });
      }, []);

      return { pokemonData, loading };
}
      
export default ReadCards;