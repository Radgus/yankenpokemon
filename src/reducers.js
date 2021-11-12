export const initialState = {
  blueScore: 0,
  blueState:  {
    cu1: 0,
    cu2: 0,
    cu3: 0,
  },
  redScore: 0,
  redState: {
    cu1: 0,
    cu2: 0,
    cu3: 0,
  }
}

export default function counter(state = {...initialState}, action) {
  switch (action.type) {
    case 'BLUE':
      return {
        ...state,
        bluePokemons: {...action.payload},
        blueState: {...state.blueState, ...action.payload},
      }
    case 'RED':
      return {
        ...state,
        redPokemons: {...action.payload},
        redState: {...state.redState, ...action.payload},
      }
    default:
      return state
  }
}
