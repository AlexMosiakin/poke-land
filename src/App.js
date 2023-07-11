import React from "react";
import PokemonList from "./components/PokemonList";
import "../src/styles/App.css"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import PokemonPage from "./components/PokemonPage";

function App() {
  const navigate = useNavigate()
  return (
    <div className="pokemon-app">
      <div onClick={() => navigate('/')} className="pokemon-app__header">
        <h1>PokeLand</h1>
      </div>
      <Routes>
        <Route exact path="/" element={<PokemonList/>}/>
        <Route exact path='/pokemon/:id' element={<PokemonPage/>}/>
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </div>
  );
}

export default App;
