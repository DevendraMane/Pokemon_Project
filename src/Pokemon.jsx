import { useState } from "react";
import { useEffect } from "react";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const API = `https://pokeapi.co/api/v2/pokemon?limit=80`;

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      //   console.log(data);

      const detailedPokemonData = data.results.map(async (currPokemon) => {
        // console.log(currPokemon.url); //*this will only give the urls
        const res = await fetch(currPokemon.url);
        //? But we want the data of those url's(for that ↓↓↓)
        const data = await res.json();

        return data;
        // console.log(data);
      });
      //   console.log(detailedPokemonData); //*This is returning Promises(to handle that↓↓↓)

      const detailedResponses = await Promise.all(detailedPokemonData);
      console.log(detailedResponses); //*Now, this will only return the Response
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      setError(error);
    }
  };
  useEffect(() => {
    fetchPokemon();
  }, []);

  if (loading) {
    return (
      <>
        <div>
          <h1>Pokemon's are Loading⌛...</h1>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div>
          <h1>{error.message}</h1>
        </div>
      </>
    );
  }

  // * Search Functionality:
  // ?How this is working:
  //* 1. `pokemon.filter` iterates over the `pokemon` array, which contains detailed Pokémon data.
  //* 2. For each Pokémon, it checks if the `name` property includes the user's search input.
  // - `currPokemon.name.toLowerCase()` converts the Pokémon's name to lowercase for case-insensitive comparison.
  // - `search.toLowerCase()` converts the search input to lowercase for case-insensitive comparison.
  // - `includes` checks if the search string is a substring of the Pokémon's name.
  //* 3. If `includes` returns `true`, the Pokémon is added to the new filtered array (`searchData`).
  //* 4. The `searchData` array contains only the Pokémon whose names match the search criteria.
  //* 5. In the JSX, `searchData` is used instead of `pokemon` to display the filtered results dynamically.
  const searchData = pokemon.filter((currPokemon) =>
    currPokemon.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <section className="container">
        <header>
          <h1>Lets Catch Pokémon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="Search Pokemon"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div>
          <ul className="cards">
            {/* for the search functionality we will write searchData instead of pokemon(see the search functionality if not understanding) */}
            {searchData.map((currPokemon) => {
              return (
                <PokemonCards
                  key={currPokemon.id}
                  currPokemonData={currPokemon}
                />
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

// !Note: If you get eslint error about type
//todo: then add this to (.eslintrc.cjs)-->(rules): "react/prop-type": "off"
