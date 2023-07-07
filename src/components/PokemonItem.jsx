import React, { useState, useEffect } from "react";
import pokeService from "../service/pokeService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { typeColors } from '../Consts.js'

function PokemonItem(props) {

  const url = props.url;
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const pokemonFetch = async () => {
    setLoading(true);
    const responce = await pokeService.getCurrentPoke(url);
    setPokemon({ ...pokemon, ...responce.data });
    setLoading(false);
  };

  useEffect(() => {
    if (!pokemon) {
      pokemonFetch(url);
    }
  }, []);

  const router = useNavigate();
  const dispatch = useDispatch();

  const getId = (id) => {
    dispatch({ type: "GET_ID", payload: id });
    router(`/pokemon/${id}`);
  };

  return isLoading ? (
    <h5>Loading...</h5>
  ) : (
    <div onClick={() => getId(pokemon.id)} className="pokemon-list-item">
      <img
        className="pokemon-list-item_image"
        src={pokemon?.sprites?.other?.dream_world?.front_default}
        alt={pokemon?.name}
      />
      <p className="pokemon-list-item_name">{pokemon?.name}</p>
      <div className="pokemon-list-item_types">
        {pokemon?.types?.map((item) => (
          <p
            style={{ background: typeColors[item?.type?.name] }}
            key={pokemon?.name}
            className="pokemon-list-item_types_item"
          >
            {item?.type?.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default PokemonItem;
