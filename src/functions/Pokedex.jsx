import { FavoritosProvider } from './FavoritosContext';
import Detalhes from "./Detalhes";
import Cards from "./Cards";

function Pokedex() {
    return (
        <FavoritosProvider>
            <div>
                <h1>Minha Aplicação Pokédex</h1>
                <Cards />
            </div>
        </FavoritosProvider>
    );
}

export default Pokedex;