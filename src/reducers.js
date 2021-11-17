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
      }
    case 'USER_CARD_POSITION':
      return {
        ...state,
        blueState: {...action.payload},
      }
    case 'BLUE_POINT':
      return {
        ...state,
        blueScore: state.blueScore + 1,
      }
    case 'RED':
      return {
        ...state,
        redPokemons: {...action.payload},
      }
    case 'NPC_CARD_POSITION':
      return {
        ...state,
        redState: {...action.payload},
      }
    case 'RED_POINT':
      return {
        ...state,
        redScore: state.redScore + 1,
      }
    default:
      return state
  }
}
