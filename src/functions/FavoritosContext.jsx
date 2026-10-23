import { createContext, useState } from 'react';

export const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
    const [favoritos, setFavoritos] = useState([]);

    function alternarFavorito(pokemon) {
        setFavoritos((prevFavoritos) => {
            const jaFavoritado = prevFavoritos.some((fav) => fav.id === pokemon.id);
            if (jaFavoritado) {
                return prevFavoritos.filter((fav) => fav.id !== pokemon.id);
            } else {
                return [...prevFavoritos, pokemon];
            }
        });
    }

    return (
        <FavoritosContext.Provider value={{ favoritos, alternarFavorito }}>
            {children}
        </FavoritosContext.Provider>
    );
}