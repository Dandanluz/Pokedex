import { useState } from 'react';
import './App.css';
import Home from './functions/Home';
import Cards from './functions/Cards';
import Favoritos from './functions/Favoritos'; 
import { FavoritosProvider } from './functions/FavoritosContext'; 

function App() {
  const [mostrarHome, setMostrarHome] = useState(true);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);
  const [mostrarCards, setMostrarCards] = useState(false);

  return (
    <FavoritosProvider>
      <div className="app-container">
        <div className='menu'>
          <button className='MostrarHome' onClick={() => {
              setMostrarHome(!mostrarHome);
              setMostrarCards(false);
              setMostrarFavoritos(false);
            }}>
            {mostrarHome ? 'Home' : 'Home'}
          </button>
          
          <button className='MostrarCards' onClick={() => {
              setMostrarCards(!mostrarCards);
              setMostrarHome(false);
              setMostrarFavoritos(false);
            }}>
            {mostrarCards ? 'Cards' : 'Cards'}
          </button>
          <button className='MostrarFav' onClick={() => {
              setMostrarFavoritos(!mostrarFavoritos);
              setMostrarHome(false);
              setMostrarCards(false);
            }}>
            {mostrarFavoritos ? 'Favoritos' : 'Favoritos'}
          </button>
        </div>
        
        {mostrarHome && <Home />}
        {mostrarCards && <Cards />}
        {mostrarFavoritos && <Favoritos />}
      </div>
    </FavoritosProvider>
  );
}

export default App;