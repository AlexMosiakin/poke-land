import React, { useEffect, useState } from "react";
import PokemonList from "./components/PokemonList";
import pokeService from "./service/pokeService";
import "../src/styles/App.css"
import Select from './components/UI/Select/Select'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PokemonPage from "./components/PokemonPage";

function App() {

  return (
    <div className="pokemon-app">
      <h1>PokeLand</h1>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<PokemonList/>}/>
        <Route exact path='/pokemon/:id' element={<PokemonPage/>}/>
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
