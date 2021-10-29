export const initialState = {
  blueScore: 0,
  redScore: 0,
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
