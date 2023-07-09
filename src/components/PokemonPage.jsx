import React, { useState, useEffect, useMemo } from "react";
import PokemonItem from "./PokemonItem";
import Select from "./UI/Select/Select";
import pokeService from "../service/pokeService";
import Input from "./UI/Input/Input";
import { useSelector } from "react-redux";
import "../styles/PokemonPage.css";
import { typeColors, statsColors, statsTitles } from "../Consts.js";
import pokeBall from "../img/pokeBall.svg";
import { useParams } from "react-router";

function PokemonPage() {
  const { id } = useParams()

  const [pokemon, setPokemon] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);
  const [pokemonEvolution, setPokemonEvolution] = useState(null);

  const [isLoading, setLoading] = useState(false);

  const pokemonFetch = async () => {
    setLoading(true);
    const pokemonResponse = await pokeService.getPokeById(id);
    setPokemon({ ...pokemon, ...pokemonResponse?.data });

    const pokemonSpeciesResponse = await pokeService.getPokeSpeciesById(id);
    setPokemonSpecies({ ...pokemonSpecies, ...pokemonSpeciesResponse?.data });

    const pokemonEvolutionResponse =
      await pokeService.getPokeEvolutionByChainUrl(
        pokemonSpeciesResponse?.data?.evolution_chain?.url
      );
    setPokemonEvolution({
      ...pokemonSpecies,
      ...pokemonEvolutionResponse?.data,
    });
    setLoading(false);
  };

  useEffect(() => {
    if (!pokemon) {
      pokemonFetch();
    }
  }, []);

  const pokemonStatsTotalValue = pokemon?.stats?.reduce((acc, value) => (
    acc += value?.base_stat
  ), 0)

  return isLoading ? (
    <div className="pokemon-page-wrapper">
      <div className="pokemon-page-header">
        <img
          className="pokemon-list-item_image loading"
          src={pokeBall}
          alt={"pokeBall"}
        />
        <p className="pokemon-list-item_name">loading</p>
      </div>
      <div className="pokemon-page-info">
        <h2>About:</h2>
        <p className="pokemon-page-info__about">???</p>

        <h2>Params:</h2>
        <div className="pokemon-page-info__params">
          <p className="pokemon-page-info__params_item">
            <span className="pokemon-page-info__params_item_title">
              Weight:
            </span>
            <span className="pokemon-page-info__params_item_value">???</span>
          </p>
          <p className="pokemon-page-info__params_item">
            <span className="pokemon-page-info__params_item_title">
              Height:
            </span>
            <span className="pokemon-page-info__params_item_value">???</span>
          </p>
          <p className="pokemon-page-info__params_item">
            <span className="pokemon-page-info__params_item_title">Exp:</span>
            <span className="pokemon-page-info__params_item_value">???</span>
          </p>
        </div>

        <h2>Abilities:</h2>
        <div className="pokemon-page-info__params">
          <p className="pokemon-page-info__params_item">
            <span className="pokemon-page-info__params_item_title">???</span>
          </p>
        </div>

        <h2>Stats:</h2>
        <div className="pokemon-page-info__params">
          <p className="pokemon-page-info__params_item">
            <span className="pokemon-page-info__params_item_title">
              ???
            </span>
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className="pokemon-page-wrapper">
      <div className="pokemon-page-header">
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
      <div className="pokemon-page-info">
        <h2>About:</h2>
        <p className="pokemon-page-info__about">
          {pokemonSpecies?.flavor_text_entries?.[0]?.flavor_text.replace(/[^a-zA-Z ]/g, "")}
        </p>

        <h2>Params:</h2>
        <div className="pokemon-page-info__params">
          <p className="pokemon-page-info__params_item">
            <span className="pokemon-page-info__params_item_title">
              Weight
            </span>
            <span className="pokemon-page-info__params_item_value">
              {pokemon?.weight / 10}kg
            </span>
          </p>
          <p className="pokemon-page-info__params_item">
            <span className="pokemon-page-info__params_item_title">
              Height
            </span>
            <span className="pokemon-page-info__params_item_value">
              {pokemon?.height}m
            </span>
          </p>
          <p className="pokemon-page-info__params_item">
            <span className="pokemon-page-info__params_item_title">Exp</span>
            <span className="pokemon-page-info__params_item_value">
              {pokemon?.base_experience}p
            </span>
          </p>
        </div>

        <h2>Abilities:</h2>
        <div className="pokemon-page-info__abilities">
          {pokemon?.abilities?.map((abilityId) => (
            <p
              className="pokemon-page-info__abilities_item"
              key={abilityId?.ability?.name}
            >
              <span className="pokemon-page-info__abilities_item_title">
                {abilityId?.ability?.name}
              </span>
            </p>
          ))}
        </div>

        <h2>Stats:</h2>
        <div className="pokemon-page-info__stats">
          {pokemon?.stats?.map((stat) => (
            <p
              className="pokemon-page-info__stats_item"
              key={stat?.stat?.name}
            >
              <span className="pokemon-page-info__stats_item_title" style={{ background: statsColors[stat?.stat?.name] }}>
                {statsTitles[stat?.stat?.name]}
              </span>
              <span className="pokemon-page-info__stats_item_value">
                {stat?.base_stat}p
              </span>
            </p>
          ))}
          <p
              className="pokemon-page-info__stats_item"
            >
              <span className="pokemon-page-info__stats_item_title" style={{ background: statsColors['total'] }}>
                {statsTitles['total']}
              </span>
              <span className="pokemon-page-info__stats_item_value">
                {pokemonStatsTotalValue}
              </span>
            </p>
        </div>
      </div>
    </div>
  );
}

export default PokemonPage;
