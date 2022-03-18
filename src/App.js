import React, { useEffect, useState } from "react";
import PokemonList from "./components/PokemonList";
import pokeService from "./service/pokeService";
import "../src/styles/App.css"

function App() {
  const offset = useState(0);
  const limit = useState(10);
  const [pokemons, setPokemons] = useState([]);

  const pokemonsFetch = async () => {
    const responce = await pokeService.getAllPoke(offset, limit);
    setPokemons([...pokemons, ...responce.data.results]);
  }
  useEffect(() => {
    pokemonsFetch();
  },[])

  return (
    <div className="pokemon-app">
      <h1>PokeLand</h1>
      <div className="pokemon-list-wrapper">
        {
          pokemons.map(pokemon => 
            <PokemonList key={pokemon.name} url={pokemon.url} />
          )
        }
      </div>
    </div>
  );
}

export default App;
