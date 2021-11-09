export const initialState = {
  blueScore: 0,
  redScore: 0,
  userState:  {
    cu1: {
      state: 0,
      redPokemon: {}
    }, 
    cu2: {
      state: 0,
      redPokemon: {}
    },  
    cu3: {
      state: 0,
      redPokemon: {}
    }, 
  },
  npcState: {
    cn1: {
      state: 0,
      redPokemon: {}
    }, 
    cn2: {
      state: 0,
      redPokemon: {}
    },  
    cn3: {
      state: 0,
      redPokemon: {}
    }, 
  }
}

export default function counter(state = {...initialState}, action) {
  switch (action.type) {
    case 'BLUE':
      return {
        ...state,
        bluePokemons: {...action.payload},
      }
    case 'RED':
      return {
        ...state,
        redPokemons: {...action.payload},
      }
    default:
      return state
  }
}
