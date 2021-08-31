import axios from 'axios';

export async function choosePokemon(pokeNumber) {
  const callAPI = await axios({
    url: `https://pokeapi.co/api/v2/pokemon/${pokeNumber}`,
    method: 'get',
  });
  console.log('callAPI: ', callAPI)
  return {
    url: callAPI.data.sprites.front_default,
    type: callAPI.data.types[0].type.name,
  };
}