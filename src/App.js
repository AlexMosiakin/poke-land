import React, { useEffect, useState } from "react";
import PokemonList from "./components/PokemonList";
import pokeService from "./service/pokeService";
import "../src/styles/App.css"
import Select from './components/UI/Select/Select'

function App() {

  return (
    <div className="pokemon-app">
      <h1>PokeLand</h1>
      <PokemonList/>
    </div>
  );
}

export default App;
