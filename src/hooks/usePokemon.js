import { useState, useEffect } from 'react';

const usePokemon = (url) => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {

    fetch(url)
      .then((response) => response.json())
      .then((data) => setPokemon(data));

  }, [url])
  
  return pokemon;
}

export default usePokemon;