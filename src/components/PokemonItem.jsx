import React, {useState, useEffect} from "react";
import pokeService from "../service/pokeService";

function PokemonItem(props){
    const url = props.url
    const [pokemon, setPokemon] = useState({
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
        const responce = await pokeService.getCurrentPoke(url);
        setPokemon({...pokemon, ...responce.data});
        setLoading(false);
    }

    useEffect(() => {
        pokemonFetch(url)
    },[])
    return(
        isLoading ? 
        <h5>Loading...</h5>
        :
        <div className="pokemon-list-item">
            <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
            <p>{pokemon.name}</p>
        </div>
    )
}

export default PokemonItem