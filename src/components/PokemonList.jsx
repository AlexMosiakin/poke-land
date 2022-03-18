import React, {useState, useEffect, useMemo} from "react";
import '../styles/PokemonList.css'
import PokemonItem from "./PokemonItem";
import Select from "./UI/Select/Select";
import pokeService from "../service/pokeService";
import Input from "./UI/Input/Input";

function PokemonList() {
    const offset = useState(0);
    const limit = useState(10);
    const [selectedSort, setSelectedSort] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [pokemons, setPokemons] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const sortedPokemons = useMemo(() => {
        if(selectedSort){
            return [...pokemons].sort((a,b) => a[selectedSort].localeCompare(b[selectedSort]));
        }
        return pokemons;
    },[selectedSort, pokemons])

    const sortedAndSearchedPokemons = useMemo(() => {
        return sortedPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchQuery));
    },[searchQuery, sortedPokemons])
  
    const pokemonsFetch = async () => {
      setLoading(true);
      const responce = await pokeService.getAllPoke(offset, limit);
      setPokemons([...pokemons, ...responce.data.results]);
      setLoading(false);
    }
    useEffect(() => {
      pokemonsFetch();
    },[])

    const sortPokemons = (sort) => {
        setSelectedSort(sort);
    }

    return(
        isLoading ? 
        <h5>Loading...</h5>
        :
        <div className="pokemon-list-wrapper">
        <div className="controls-wrapper">
            <Input 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value.toLowerCase())}
                placeholder="Search..."
            />
            <Select 
                value={selectedSort}
                onChange={sortPokemons}
                defaultValue='Sort'
                options={[
                {value: 'name', name: 'By name'},
                {value: 'url', name: 'By id'},
                ]}
            />
        </div>
        {sortedAndSearchedPokemons.length ? 
        <div className="pokemon-list-container">
            {sortedAndSearchedPokemons.map(pokemon => 
                <PokemonItem key={pokemon.name} url={pokemon.url}/>
            )}
        </div>
        :
        <h5 className="no-pokemons">No pokemons :(</h5>
        }
        </div>
    )
}

export default PokemonList