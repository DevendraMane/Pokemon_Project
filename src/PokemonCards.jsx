export const PokemonCards = ({ currPokemonData }) => {
  return (
    <>
      <li className="pokemon-card" key={currPokemonData.id}>
        <figure>
          <img
            src={currPokemonData.sprites.other.dream_world.front_default}
            alt={currPokemonData.name}
            className="pokemon-image"
          />
        </figure>
        <h1>{currPokemonData?.name}</h1>
        <div className="pokemon-info pokemon-highlight">
          <p>
            {/* console.log(currType.type.name); */}
            {currPokemonData.types
              .map((currType) => currType.type.name)
              .join(", ")}
          </p>
        </div>
        <div className="grid-three-cols">
          <p className="pokemon-info">
            Height: <span> {currPokemonData.height} </span>
          </p>
          <p className="pokemon-info">
            Weight: <span> {currPokemonData.weight}</span>
          </p>
          <p className="pokemon-info">
            speed: <span>{currPokemonData.stats[5].base_stat}</span>
          </p>
        </div>
        <div className="grid-three-cols">
          <div className="pokemon-info">
            <p>{currPokemonData.base_experience}</p>
            <span>Experience:</span>
          </div>
          <div className="pokemon-info">
            <p>{currPokemonData.stats[1].base_stat}</p>
            <span>Attack:</span>
          </div>
          <div className="pokemon-info">
            <p>
              {currPokemonData.abilities
                .map((abilityInfo) => abilityInfo.ability.name)
                .slice(0, 1)
                .join(", ")}
            </p>
            <span>Abilities:</span>
          </div>
        </div>
      </li>
    </>
  );
};
