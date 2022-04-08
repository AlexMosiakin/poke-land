import React, {useState, useEffect, useMemo} from "react";
import PokemonItem from "./PokemonItem";
import Select from "./UI/Select/Select";
import pokeService from "../service/pokeService";
import Input from "./UI/Input/Input";
import { useSelector } from 'react-redux'
import '../styles/PokemonPage.css'

function PokemonPage() {
    const id = useSelector(state => state.id.id);

    const [pokemon, setPokemon] = useState({
        abilities:[],
        sprites:{
            other:{
                dream_world:{
                    front_default: 0
                }
            }
        }
    });
    const [isLoading, setLoading] = useState(false);
  
    const pokemonFetch = async () => {
      setLoading(true);
      const responce = await pokeService.getPokeById(id);
      setPokemon({...pokemon, ...responce.data});
      setLoading(false);
    }
    useEffect(() => {
      pokemonFetch();
    },[])

    return(
        isLoading ? 
        <h5>Loading...</h5>
        :
        <div className="pokemon-page-wrapper">
            <div className="pokemon-page-container">
                <div className="pokemon-page-image">
                    <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
                </div>
            </div>
            <div className="pokemon-page-info">
                    <p>Name: {pokemon.name}</p>
                    <p>Base experience: {pokemon.base_experience}</p>
                    <p>Height: {pokemon.height}</p>
                    <p>Weight: {pokemon.weight}</p>
                    {pokemon.abilities.map(abilityId => 
                        <p key={abilityId.ability.name}>Ability: {abilityId.ability.name}</p>
                    )}
            </div>
        </div>
    )
}

export default PokemonPage