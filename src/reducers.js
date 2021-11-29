export const initialState = {
  blueScore: 0,
  blueState: {cu1: 0, cu2: 0, cu3: 0},
  redScore: 0,
  redState: {cu1: 0, cu2: 0, cu3: 0},
  round: 1,
  showPlay: true,
  showPlayAgain: false,
  showFigth: false,
  choicePokemonMessage: false,
  teamWinerMessage: false,
  teamWinerPoint: 'no',
}

export default function counter(state = {...initialState}, action) {
  switch (action.type) {

    case 'BLUE': return { ...state, bluePokemons: {...action.payload} }

    case 'USER_CARD_POSITION': return { ...state, blueState: {...action.payload} }

    case 'BLUE_POINT': return { ...state, blueScore: state.blueScore + 1 }

    case 'RED': return { ...state, redPokemons: {...action.payload} }

    case 'NPC_CARD_POSITION': return { ...state, redState: {...action.payload} }

    case 'RED_POINT': return { ...state, redScore: state.redScore + 1 }

    case 'RESET_SCORE': return { ...state, blueScore: 0, redScore: 0 }

    case 'ROUND': return { ...state, round: action.payload }

    case 'SHOW_PLAY': return { ...state, showPlay: action.payload }

    case 'SHOW_PLAY_AGAIN': return { ...state, showPlayAgain: action.payload }

    case 'SHOW_FIGTH': return { ...state, showFigth: action.payload }

    default: return state
  }
}
