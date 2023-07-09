import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import "../styles/PokemonList.css";
import PokemonItem from "./PokemonItem";
import Select from "./UI/Select/Select";
import pokeService from "../service/pokeService";
import Input from "./UI/Input/Input";

function PokemonList() {
  const [offset, setOffset] = useState(0)
  const limit = 10
  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const sortedPokemons = useMemo(() => {
    if (selectedSort) {
      return [...pokemons].sort((a, b) =>
        a[selectedSort].localeCompare(b[selectedSort])
      );
    }
    return pokemons;
  }, [selectedSort, pokemons]);

  const sortedAndSearchedPokemons = useMemo(() => {
    return sortedPokemons?.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery)
    );
  }, [searchQuery, sortedPokemons]);

  const pokemonsFetch = async () => {
    setLoading(true);
    const responce = await pokeService.getAllPoke(offset, limit);
    setPokemons([...pokemons, ...responce.data.results]);
    setLoading(false);
  };

  useEffect(() => {
    if(offset !== 0){
        pokemonsFetch();
    }
  }, [offset]);

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setOffset(prev => prev + 10)
        observer.disconnect()
      }
    },
    {
      rootMargin: "0px 0px 0px 0px",
      threshold: 0,
    }
  );

  useEffect(() => {
    pokemonsFetch();
  }, [])

  const lastPokemonRef = useRef();

  useLayoutEffect(() => {
    if (!!sortedAndSearchedPokemons?.length && !isLoading) {
      setTimeout(() => {
        observer.observe(lastPokemonRef.current);
      }, 500)
    }
  }, [sortedAndSearchedPokemons, isLoading]);

  const sortPokemons = (sort) => {
    setSelectedSort(sort);
  };

  return (
    <div className="pokemon-list-wrapper">
      <div className="controls-wrapper">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          placeholder="Search..."
        />
        <Select
          value={selectedSort}
          onChange={sortPokemons}
          defaultValue="Sort"
          options={[
            { value: "name", name: "By name" },
            { value: "url", name: "By id" },
          ]}
        />
      </div>
      {!!sortedAndSearchedPokemons?.length ? (
        <div className="pokemon-list-container">
          {sortedAndSearchedPokemons.map((pokemon, index) => (
            <div
              ref={
                index === sortedAndSearchedPokemons?.length - 1
                  ? lastPokemonRef
                  : undefined
              }
            >
              <PokemonItem key={pokemon.name} url={pokemon.url} />
            </div>
          ))}
        </div>
      ) : (
        <h5 className="no-pokemons">No pokemons :(</h5>
      )}
    </div>
)}

export default PokemonList;
