import { useState } from 'react';
import './App.css';
import Cards from './functions/Cards';
import Favoritos from './functions/Favoritos'; 
import { FavoritosProvider } from './functions/FavoritosContext'; 

function App() {
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);

  return (
    <FavoritosProvider>
      <div className="app-container">
        <h1>Pokedex do Dandan</h1>
        
        <button onClick={() => setMostrarFavoritos(!mostrarFavoritos)}>
          {mostrarFavoritos ? 'Ocultar Favoritos' : 'Ver Favoritos'}
        </button>

        {mostrarFavoritos && <Favoritos />}

        <Cards />
      </div>
    </FavoritosProvider>
  );
}

export default App;