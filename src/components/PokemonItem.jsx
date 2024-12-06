import React, { useState, useEffect } from "react";
import pokeService from "../service/pokeService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { typeColors } from "../Consts.js";
import pokeBall from "../img/pokeBall.svg";

function PokemonItem(props) {
  const url = props.url;
  const router = useNavigate();
  const dispatch = useDispatch();

  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const pokemonFetch = async () => {
    setLoading(true);
    const response = await pokeService.getCurrentPoke(url);
    setPokemon({ ...pokemon, ...response.data });
    setLoading(false);
  };

  const getId = (id) => {
    dispatch({ type: "GET_ID", payload: id });
    router(`/poke-land/pokemon/${id}`);
  };

  const getTypeColorElement = (pokemon) => (
    <p
      style={{ background: typeColors[pokemon?.type?.name || "normal"]}}
      key={pokemon?.id || "loading"}
      className="pokemon-list-item_types_item"
    >
      {pokemon?.type?.name || "loading"}
    </p>
  )

  useEffect(() => {
    if (!pokemon) {
      pokemonFetch(url);
    }
  }, []);

  return (
    <div onClick={() => getId(pokemon.id)} className="pokemon-list-item">
      <img
        className="pokemon-list-item_image"
        src={pokemon?.sprites?.other?.dream_world?.front_default || pokeBall}
        alt={pokemon?.name}
      />
      <p className="pokemon-list-item_name">{pokemon?.name || "loading"}</p>
      <div className="pokemon-list-item_types">
        {pokemon?.types.length ? pokemon?.types.map((item) => (
          getTypeColorElement(item)
        )) : getTypeColorElement()}
      </div>
    </div>
  )
}

export default PokemonItem;
